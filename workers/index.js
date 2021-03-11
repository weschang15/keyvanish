const { QUEUE_NAME_EXPIRE_SECRET } = require("../queues/queueNames");
const { handleExpireSecret } = require("./handleExpireSecret");

function startWorkers() {
  return {
    [QUEUE_NAME_EXPIRE_SECRET]: handleExpireSecret,
  };
}

module.exports = { startWorkers };
