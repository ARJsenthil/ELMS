const auth = require('../middlewares/auth');

const BASE_URL = '/api/v1/';

module.exports = function (app) {
    app.use(`${BASE_URL}auth`, require('./auth'));
    app.use(`${BASE_URL}department`, auth, require('./department'));
    app.use(`${BASE_URL}leave`, auth, require('./leaveRequest'));
    app.use(`${BASE_URL}leaveType`, auth, require('./leaveType'));
    app.use(`${BASE_URL}employee`, auth, require('./employee'));
    app.use(`${BASE_URL}delete`, auth, require('../controller/admin/deleteData'));
    app.use(`${BASE_URL}dashboard`, auth, require('./dashboard'));
}