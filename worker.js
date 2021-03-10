const queues = require("./shared/queues");
const { createQueue } = require("./shared/services/bull");

(function () {
  queues.forEach(({ queueName, queueProcessor }) => {
    const queue = createQueue(queueName);
    queue.process(queueName, 5, queueProcessor);
  });

  console.log(`Worker started`);
})();
