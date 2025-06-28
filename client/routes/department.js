const Router = require('express').Router();
const department = require('../controller/admin/department');

Router.post('/', department.create);
Router.get('/', department.getAll);
Router.get('/:id',department.getById);
Router.put('/:id', department.update);

module.exports = Router;