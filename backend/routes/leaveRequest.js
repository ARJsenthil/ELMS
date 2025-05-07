const leaveRequest = require("../controller/admin/leaveRequest");

const Router = require("express").Router();

Router.post('/', leaveRequest.create);
Router.get('/', leaveRequest.getAll);
Router.get('/:id', leaveRequest.getById);
Router.put('/:id', leaveRequest.update);

module.exports = Router;