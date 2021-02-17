const { agenda } = require("./shared/services/agenda");

agenda.on("ready", async () => {
  try {
    await agenda.start();
  } catch (error) {
    console.error(error);
  }
});

process.on("SIGTERM", async () => {
  await agenda.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await agenda.stop();
  process.exit(0);
});
