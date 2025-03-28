const BASE_URL = '/api/v1/';

module.exports = function (app) {
    app.use(`${BASE_URL}leave`, require('../controller/admin/leaveRequest'));
    app.use(`${BASE_URL}leaveType`, require('../controller/admin/leaveType'));
    app.use(`${BASE_URL}employee`, require('../controller/admin/employee'));
    app.use(`${BASE_URL}delete`, require('../controller/admin/deleteData'));
}