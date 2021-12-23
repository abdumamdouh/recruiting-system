const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')

//const auth = require('../middleware/auth') 


const router = new express.Router()

// Sign-up
router.post('/Recruiter/Sign-up' , async (req,res) =>{
    const recruiter = req.body
    try {
        
        const record = await Recruiter.create( recruiter )
        
        const token = await record.generateAuthToken()

        res.status(200).send(token)   
     
    } catch (error) {
        res.status(400).send(error.message)
    }

})
// login 
router.post('./Recruiter/Login' , async (req,res) =>{

})

module.exports = router