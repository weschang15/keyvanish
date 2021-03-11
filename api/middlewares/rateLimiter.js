const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const { createRedis } = require("../../shared/services/redis");
const { getMsFromMins } = require("../../shared/utils/time");
const client = createRedis();

exports.rateLimiter = rateLimit({
  store: new RedisStore({
    client,
  }),
  windowMs: getMsFromMins(1),
  max: 10,
});
