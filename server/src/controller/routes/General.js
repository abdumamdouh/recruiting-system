const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')


const router = new express.Router()

// login for recruiters or applicants
router.post('/Login' , async (req,res) =>{
    const email = req.body.email 
    const password = req.body.password
    try {
        const recruiter = await Recruiter.findByCredentials(email,password)
        const applicant = await Applicant.findByCredentials(email,password)
        if (recruiter){
            const token = await recruiter.generateAuthToken() 
            res.status(200).send({token,
                type:"Recruiter",
                name:`${recruiter.firstName} ${recruiter.lastName}.`
            })
        } else if (applicant){
            const token = await applicant.generateAuthToken() 
            res.status(200).send({token,
                type:"Applicant",
                name:`${applicant.firstName} ${applicant.lastName}.`
            })
        } 
        else {
            throw new Error('Email or password is incorrect.')
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router