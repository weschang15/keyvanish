const express = require("express");
const middlewares = require("./middlewares");

const app = express();

app.set("trust proxy", 1);
app.set("port", process.env.PORT);
app.use(middlewares);
