const { Secret } = require("../../models");

module.exports = (agenda) => {
  agenda.define("expire secret message", async (job) => {
    const { secretId } = job.attrs.data;
    await Secret.findByIdAndDelete(secretId);
  });
};
