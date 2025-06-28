const employee = require("../controller/admin/employee");
const Router = require("express").Router();

Router.post('/', employee.create);
Router.get('/', employee.getAll);
Router.get('/:id', employee.getById);
Router.put('/:id', employee.update);

module.exports = Router;