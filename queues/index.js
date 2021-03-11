const { Queue, QueueScheduler } = require("bullmq");
const { createRedis } = require("../shared/services/redis");
const { QUEUE_NAME_EXPIRE_SECRET } = require("./queueNames");

const queues = {
  [QUEUE_NAME_EXPIRE_SECRET]: {
    queue: new Queue(QUEUE_NAME_EXPIRE_SECRET, {
      connection: createRedis(),
    }),
    scheduler: new QueueScheduler(QUEUE_NAME_EXPIRE_SECRET, {
      connection: createRedis(),
    }),
  },
};

function getQueues() {
  return (queueName) => {
    return queues[queueName].queue;
  };
}

const getQueueByName = getQueues();

function addToQueue(queue = "") {
  const q = getQueueByName(queue);
  return (data = {}, opts = {}) => {
    return q.add(queue, data, opts);
  };
}

const addToExpireSecretQueue = addToQueue(QUEUE_NAME_EXPIRE_SECRET);

module.exports = { addToExpireSecretQueue };
