const rateLimit = require("express-rate-limit");
const { getMsFromMins } = require("../../shared/utils/time");

exports.rateLimiter = rateLimit({
  windowMs: getMsFromMins(1),
  max: 10,
});
