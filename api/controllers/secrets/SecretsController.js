const argon2 = require("argon2");

const { Secret } = require("../../../models");
const { encrypt, decrypt } = require("../../../shared/services/encryption");
const { getRequestLogger, logger } = require("../../../shared/services/logger");
const { getMsFromDays } = require("../../../shared/utils/time");

const SecretsController = {};

SecretsController.createSecret = async function (req, res) {
  try {
    const { content, password } = req.body;

    const hasPassword = Boolean(password && password.length);
    const hashedPassword = hasPassword && (await argon2.hash(password));
    const encryptedContent = await encrypt(content, hashedPassword);

    const secret = new Secret({
      content: encryptedContent,
      hasPassword,
      ...(hasPassword && { password: hashedPassword }),
    });

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
      .where("expiration")
      .gt(new Date(Date.now()))
      .exec();

    if (!encryptedSecret) {
      return res.status(404).json({
        message:
          "Unknown secret. The requested secret could not be found or has expired.",
      });
    }

    const hasPassword = encryptedSecret.hasPassword;

    if (hasPassword) {
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
    }

    const decryptedSecret = await decrypt(
      encryptedSecret.content,
      encryptedSecret.password
    );

    const { content, password, ...rest } = encryptedSecret;
    return res.status(201).json({
      content: decryptedSecret,
      ...rest,
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
