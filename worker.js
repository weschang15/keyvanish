require("dotenv").config();
const { createConnection } = require("./shared/services/mongodb");
const { startWorkers } = require("./workers");

createConnection().then(() => {
  startWorkers();
  console.log(`Worker started`);
});
