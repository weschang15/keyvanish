const Agenda = require("agenda");
const expireSecrets = require("../jobs/expireSecrets");

const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URI,
    collection: "jobs",
    options: {
      useUnifiedTopology: true,
    },
  },
  maxConcurrency: 100,
  defaultConcurrency: 100,
});

function createJob(job) {
  return job(agenda);
}

createJob(expireSecrets);

agenda.on("ready", async () => {
  agenda.start();
});

module.exports = { agenda };
