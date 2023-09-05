const express = require('express');
const router = express.Router();
const path = require('fs');
const AdminModel = require('../model/addadmin')
const DoctorModel = require('../model/adddoctor');
const PatientModel = require('../model/addpatient');

router.get('/admin/:email/:pass', (req, res)=>{
    const email = req.params.email;
    const pass = req.params.pass;
    AdminModel.find({email:email ,password:pass})
    .then(result=>res.json(result))
    .catch((error)=>res.json(error))
})

router.post('/addpatient', (req, res)=>{
        const data = req.body;
        PatientModel.create(data)
        .then(result=>res.json(result))
        .then(()=>console.log("Patient created"))
        .catch((err)=>console.log(err))
        // console.log(data)
})

// router.get('/patientdetails/:name/:mblno', (req, res)=>{
//     const name = req.params.name;
//     const mblno = req.params.mblno;
//     PatientModel.find({name:name}, {mblno:mblno})
//     .then(user=>res.json(user))
// })

router.get('/patientdetailsbyname/:name', async (req, res)=>{
    const name = req.params.name;
    await PatientModel.find({name:name}).collation({locale: 'en', strength:2})
    .then(user=>res.json(user))
})

router.get('/patientdetailsbymblno/:mblno', (req, res)=>{
    const mblno = req.params.mblno;
    PatientModel.find({mblno:mblno})
    .then(user=>res.json(user))
})

router.get('/patientdetailsbydoctor/:doctor', (req, res)=>{
    const doctor = req.params.doctor;
    PatientModel.find({doctor:doctor})
    .then(user=>res.json(user))
})

router.get('/patientdetails', (req, res)=>{
    PatientModel.find()
    .then(user=>res.json(user))
})

router.put('/updatepatient/:id', async (req, res)=>{
    const id = req.params.id;
    const data = req.body;
    const doc = await PatientModel.updateOne({_id:id},data)
    .then((result)=>res.json(result))
    console.log(data)
    console.log(id)
    console.log(doc)
})

router.delete('/deletepatient/:id', async (req, res)=>{
    const id = req.params.id;
    await PatientModel.deleteOne({_id:id})
    .then((result)=>res.json(result))
    console.log('Patient deleted')

})

router.post('/adddoctor', (req, res)=>{
    const data = req.body;
    DoctorModel.create(data)
    .then((result)=>res.json(result))
    .then(()=>console.log("Doctor created"))
    .catch((err)=>console.log(err))
})

router.get('/doctordetails', (req, res)=>{
    DoctorModel.find()
    .then((user)=>res.json(user))
})

router.put('/updatedoctor/:id', async (req, res)=>{
    const id = req.params.id;
    const data = req.body;
    const doc = await DoctorModel.updateOne({_id:id},data)
    .then((result)=>res.json(result))
    console.log(data)
    console.log(id)
    console.log(doc)
})

router.delete('/deletedoctor/:id', async (req, res)=>{
    const id = req.params.id;
    await DoctorModel.deleteOne({_id:id})
    .then((result)=>res.json(result))
    console.log('Doctor deleted')
})

module.exports = router;
