const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
    doctorname: String,
    doctoremail: String,
    speciality: String
})

const DoctorModel = mongoose.model('doctor', DoctorSchema);
module.exports = DoctorModel;