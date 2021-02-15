const { Router } = require("express");
const secretRoutes = require("./secrets");

const routes = Router();

routes.use("/secrets", secretRoutes);

module.exports = routes;
