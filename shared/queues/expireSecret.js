const { Secret } = require("../../models");
const { logger } = require("../services/logger");

const queueName = "expire secret message";

async function onExpireSecret({ data }) {
  try {
    const { secretId } = data;
    await Secret.findByIdAndDelete(secretId).exec();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

function queueProcessor(job) {
  return onExpireSecret(job);
}

module.exports = {
  queueName,
  queueProcessor,
  QUEUE_EXPIRE_SECRET: queueName,
};
