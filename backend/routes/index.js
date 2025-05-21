const auth = require('../middlewares/auth');

const BASE_URL = '/api/v1/';

module.exports = function (app) {
    app.use(`${BASE_URL}auth`, require('./auth'));
    app.use(`${BASE_URL}department`, require('./department'));
    app.use(`${BASE_URL}leave`, require('./leaveRequest'));
    app.use(`${BASE_URL}leaveType`, require('./leaveType'));
    app.use(`${BASE_URL}employee`, require('./employee'));
    app.use(`${BASE_URL}delete`, require('../controller/admin/deleteData'));
}