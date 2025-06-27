const Router = require("express").Router();
const dashboard = require("../controller/admin/dashboard");

Router.get('/totalCount', dashboard.totalCount);

module.exports = Router;
