const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')

const recruiterAuth = require('../middleware/recruiterAuth') 


const router = new express.Router()

// Sign-up
router.post('/Recruiter/Sign-up' , async (req,res) =>{
    const recruiter = req.body
    try {
        const takenEmail = await Applicant.findOne({ where: { email:req.body.email } }) || await Recruiter.findOne({ where: { email:req.body.email } })
        
        if (takenEmail){
            throw new Error("Email is already registered.")
        } else {
            const record = await Recruiter.create( recruiter )
            const token = await record.generateAuthToken()
            res.status(200).send({token,
                type:"Recruiter",
                name:`${recruiter.firstName} ${recruiter.lastName}.`
            })   
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Read recruiter profile
router.post('/Recruiter/me' , recruiterAuth, async (req,res) => {
    res.status(200).send(req.recruiter.getPublicRecruiterData())
})

// Update recruiter profile
router.patch('/Recruiter/me/update' , recruiterAuth, async (req,res) => {
    res.status(200).send(await req.recruiter.updatePublicRecruiterData( req.body ))
})

module.exports = router