const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    address: String,
      age: Number,
      appio_time: String,
      confirm_status: String,
      date: String,
      doctor: String,
      mblno: Number,
      name: String,
      sex: String,
      status: String
})

const PatientModel = mongoose.model('patient', PatientSchema);
module.exports = PatientModel;