const Agenda = require("agenda");
const expireSecrets = require("../jobs/expireSecrets");

const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: "jobs" },
  maxConcurrency: 100,
  defaultConcurrency: 100,
});

function createJob(job) {
  return job(agenda);
}

createJob(expireSecrets);

module.exports = { agenda };
