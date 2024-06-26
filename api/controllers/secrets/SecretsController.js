const argon2 = require("argon2");
const { Secret } = require("../../../models");
const { addToExpireSecretQueue } = require("../../../queues");
const { encrypt, decrypt } = require("../../../shared/services/encryption");
const { getRequestLogger, logger } = require("../../../shared/services/logger");
const { getMsFromMins } = require("../../../shared/utils/time");

const SecretsController = {};

SecretsController.createSecret = async function (req, res) {
  try {
    const password = await argon2.hash(req.body.password);
    const content = await encrypt(req.body.content, password);

    const delay = Number(req.body.expiration);
    const expiration = new Date(Date.now() + delay);

    const secret = new Secret({ content, password, expiration });
    await secret.save();

    await addToExpireSecretQueue(
      {
        secretId: secret._id,
      },
      {
        delay,
      }
    );

    return res.status(201).json(secret);
  } catch (error) {
    const { traceId, requestLogger } = getRequestLogger();

    requestLogger.error(error);
    return res.status(500).json({
      timestamp: new Date(Date.now()),
      message: "Internal server error.",
      errors: [],
      traceId: traceId,
    });
  }
};

SecretsController.getSecret = async function (req, res) {
  try {
    const { id } = req.params;

    const encryptedSecret = await Secret.findById(id)
      .where("expiration")
      .gt(new Date(Date.now()))
      .exec();

    if (!encryptedSecret) {
      return res.status(404).json({
        timestamp: new Date(Date.now()),
        message: "Unknown secret. The requested secret could not be found.",
        errors: [],
      });
    }

    if (encryptedSecret.used) {
      return res.status(403).json({
        timestamp: new Date(Date.now()),
        message:
          "The requested secret has already been viewed. For security reasons, you must notify the link sender that the secret has already been viewed.",
        errors: [],
      });
    }

    if (!req.body.password) {
      return res.status(403).json({
        timestamp: new Date(Date.now()),
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
        timestamp: new Date(Date.now()),
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
      message: "Internal server error.",
      errors: [],
      traceId: traceId,
    });
  }
};

module.exports = SecretsController;
