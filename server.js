const api = require("./api/api");
const { createConnection } = require("./shared/services/mongodb");

createConnection().then(() => {
  const server = api.listen(api.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });
});
