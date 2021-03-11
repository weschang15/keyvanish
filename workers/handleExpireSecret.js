const { Worker } = require("bullmq");
const { Secret } = require("../models");
const { QUEUE_NAME_EXPIRE_SECRET } = require("../queues/queueNames");
const { logger } = require("../shared/services/logger");

async function onExpireSecret({ data }) {
  try {
    const { secretId } = data;
    await Secret.findByIdAndDelete(secretId).exec();
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const handleExpireSecret = new Worker(QUEUE_NAME_EXPIRE_SECRET, onExpireSecret);

module.exports = {
  handleExpireSecret,
};
