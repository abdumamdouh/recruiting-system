const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')

//const auth = require('../middleware/auth') 

const router = new express.Router()

router.post('/Applicant/Sign-up' , async (req,res) =>{
    const applicant = req.body
    // console.log( applicant )
    try {
        const record = await Applicant.create( applicant )
        const token = await record.generateAuthToken()

        const applicants = await Applicant.findAll()
        console.log(applicant)
        // console.log(typeof record.dataValues.tokens)
        res.status(200).send(record)   
     
    } catch (error) {
        res.status(400).send(error.message)
    }

})

// router.post('./Applicant' , async (req,res) =>{

//     res.status(400).send(error.message)
  
        

// })

module.exports = router