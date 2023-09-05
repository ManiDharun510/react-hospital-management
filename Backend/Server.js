const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/hmdb')

app.use('/', require('./routes/adminroot'))
app.use('/', require('./routes/doctorroot'))
app.use('/', require('./routes/patientroot'))

app.listen(4000, ()=>{
    console.log('server is running')
})