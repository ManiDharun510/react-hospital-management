const express = require('express');
const router = express.Router();
const path = require('fs');
const DoctorModel = require('../model/adddoctor');
const PatientModel = require('../model/addpatient');

const d = new Date();
const dat = d.getDate()<10 ? 0+""+d.getDate() : d.getDate();
const mon = d.getMonth()+1;
const cmon = mon<10 ? 0+""+mon : mon;
const year = `${d.getFullYear()+"-"+cmon+"-"+dat}`;
console.log(year)

router.get('/doctor/:email', (req, res)=>{
    let email = req.params.email;
    DoctorModel.find({doctoremail:email})
    .then((result)=>res.json(result))
    .catch(err=>res.json(err))
})

router.get('/getdoctor/:email',(req, res)=>{
    let email = req.params.email;
    DoctorModel.find({doctoremail:email})
    .then((result)=>res.json(result))
    .catch(err=>res.json(err))
})

router.get('/todaypatientlist/:name',(req, res)=>{
    let name = req.params.name;
    PatientModel.find({doctor:name, date:year})
    .then((result)=>res.json(result))
    .catch(err=>res.json(err))
})

module.exports = router;