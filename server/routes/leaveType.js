const Router = require("express").Router();
const leaveType = require("../controller/admin/leaveType");

Router.post('/', leaveType.create);
Router.get('/', leaveType.getAll);
Router.get('/:id', leaveType.getById);
Router.put('/:id', leaveType.update);

module.exports = Router;