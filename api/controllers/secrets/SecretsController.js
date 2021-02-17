const argon2 = require("argon2");

const { Secret } = require("../../../models");
const { encrypt, decrypt } = require("../../../shared/services/encryption");
const { getRequestLogger, logger } = require("../../../shared/services/logger");
const { getMsFromDays } = require("../../../shared/utils/time");

const SecretsController = {};

SecretsController.createSecret = async function (req, res) {
  try {
    const password = await argon2.hash(req.body.password);
    const content = await encrypt(req.body.content, password);

    const secret = new Secret({ content, password });
    // TODO: add AgendaJS to run at user-specified expiration time which will mark Secret as expired and remove
    await secret.save();

    return res.status(201).json(secret);
  } catch (error) {
    const { traceId, requestLogger } = getRequestLogger();

    requestLogger.error(error);
    return res.status(500).json({
      timestamp: Date.now(),
      error: "Internal server error.",
      traceId: traceId,
    });
  }
};

SecretsController.getSecret = async function (req, res) {
  try {
    const { id } = req.params;

    const encryptedSecret = await Secret.findById(id)
      .where("used")
      .equals(false)
      .where("expiration")
      .gt(new Date(Date.now()))
      .exec();

    if (!encryptedSecret) {
      return res.status(404).json({
        message:
          "Unknown secret. The requested secret could not be found or has expired.",
      });
    }

    if (!req.body.password) {
      return res.status(403).json({
        message: "This secret requires a password.",
        errors: [],
      });
    }

    const valid = await argon2.verify(
      encryptedSecret.password,
      req.body.password
    );

    if (!valid) {
      return res.status(403).json({
        message: "Double check your password.",
        errors: [],
      });
    }

    const decryptedSecret = await decrypt(
      encryptedSecret.content,
      encryptedSecret.password
    );

    encryptedSecret.used = true;
    await encryptedSecret.save();

    return res.status(201).json({
      ...encryptedSecret.toJSON(),
      content: decryptedSecret,
    });
  } catch (error) {
    const { traceId, requestLogger } = getRequestLogger();

    requestLogger.error(error);
    return res.status(500).json({
      timestamp: Date.now(),
      error: "Internal server error.",
      traceId: traceId,
    });
  }
};

module.exports = SecretsController;
