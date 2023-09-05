const express = require('express');
const router = express.Router();
const path = require('fs');
const PatientModel = require('../model/addpatient');


router.get('/patient/:number', (req, res)=>{
    let mblno = req.params.number;
    PatientModel.find({mblno:mblno})
    .then((result)=>res.json(result))
    .catch(err=>res.json(err))
})

router.get('/getpatient/:number',(req, res)=>{
    let mblno = req.params.number;
    PatientModel.find({mblno:mblno})
    .then((result)=>res.json(result))
    .catch(err=>res.json(err))
})

module.exports = router;