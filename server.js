const api = require("./api/api");

const server = api.listen(api.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
