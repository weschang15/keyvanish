const express = require("express");
const middlewares = require("./middlewares");
const routes = require("./routes");

const app = express();

app.set("trust proxy", 1);
app.set("port", process.env.PORT);
app.use(middlewares);

app.use("/api", routes);

module.exports = app;
