const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')

const applicantAuth = require('../middleware/applicantAuth') 

const router = new express.Router()

router.post('/Applicant/Sign-up' , async (req,res) =>{
    const applicant = req.body
    try {
        const takenEmail = await Applicant.findOne({ where: { email:req.body.email } }) || await Recruiter.findOne({ where: { email:req.body.email } })

        if (takenEmail){
            throw new Error("Email is already registered.")
        } else {
            const record = await Applicant.create( applicant )
            const token = await record.generateAuthToken()
            res.status(200).send({token,message:"Registered Successfully."})   
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/Applicant/me' , applicantAuth , async (req,res) => {
    res.status(200).send(req.applicant.getPublicApplicantData()) ;
})

// Update Applicant profile
router.patch('/Applicant/me/update' , applicantAuth , async (req,res) => {
    res.status(200).send(await req.applicant.updatePublicApplicantData( req.body )) ;
})


module.exports = router