const { createLogger, format, transports } = require("winston");
const { combine, timestamp, errors, prettyPrint, json, metadata } = format;
const { v4 } = require("uuid");

function createTraceId() {
  const traceId = v4();
  return traceId;
}

const logger = createLogger({
  level: "info",
  format: combine(errors({ stack: true }), metadata(), json()),
  defaultMeta: { service: "rest-api" },
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "debug.log", level: "debug" }),
    ...(process.env.NODE_ENV === "development" && [
      new transports.Console({
        format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
      }),
    ]),
  ],
});

function getRequestLogger() {
  const traceId = createTraceId();
  const requestLogger = logger.child({ traceId });

  return { traceId, requestLogger };
}

module.exports = { logger, getRequestLogger, createTraceId };
