const Router = require('express').Router();
const auth = require('../controller/admin/auth');

Router.post('/login', auth.login);
Router.post('/register', auth.register);

module.exports = Router;