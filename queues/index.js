const { Queue, QueueScheduler } = require("bullmq");
const { QUEUE_NAME_EXPIRE_SECRET } = require("./queueNames");

const queues = {
  [QUEUE_NAME_EXPIRE_SECRET]: {
    queue: new Queue(QUEUE_NAME_EXPIRE_SECRET),
    scheduler: new QueueScheduler(QUEUE_NAME_EXPIRE_SECRET),
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
