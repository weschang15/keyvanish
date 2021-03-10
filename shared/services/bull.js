const Queue = require("bull");
const { createRedis } = require("./redis");

exports.createQueue = function (qName, qOptions = {}, listeners) {
  if (!qName) {
    throw new Error("Cannot create queue without name.");
  }

  const queue = new Queue(qName, {
    createClient: function (type) {
      return createRedis();
    },
    ...qOptions,
  });

  // create queue event listeners here
  // queue.on("failed", () => {});
  if (listeners) {
    Object.entries(listeners).forEach(([event, func]) => {
      queue.on(event, func);
    });
  }

  return queue;
};
