const Redis = require("ioredis");

exports.createRedis = function (opts = {}) {
  return new Redis(process.env.REDIS_URI, { ...opts });
};
