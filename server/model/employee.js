const schema = {
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    mailId: { type: String, required: true},
    password: { type: String, required: true},
    gender: { type: String, required: true},
    dob: { type: String, required: true},
    deptNumber: { type: String, required: true},
    country: { type: String, required: true},
    street: { type: String, required: true},
    phNo: { type: String, required: true},
}


module.exports = schema;