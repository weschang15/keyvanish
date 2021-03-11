const { Router, json, urlencoded } = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimiter } = require("./rateLimiter");

const middlewares = Router();

middlewares.use(helmet());
middlewares.use(json());
middlewares.use(urlencoded({ extended: true }));
middlewares.use(cors());
middlewares.use(rateLimiter);

module.exports = middlewares;
