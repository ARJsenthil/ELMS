const Router = require('express').Router();
const auth = require('../controller/admin/auth');

Router.post('/login', auth.login);
Router.post('/refresh', auth.refresh);
Router.post('/logout', auth.logout);
Router.post('/register', auth.register);

module.exports = Router;