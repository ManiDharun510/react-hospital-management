const mongoose = require('mongoose')

const adminschema = new mongoose.Schema({
      username: String,
      email: String,
      password: Number
})

const AdminModel = mongoose.model('admin', adminschema)
module.exports = AdminModel;