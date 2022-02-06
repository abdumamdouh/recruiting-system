const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')


const router = new express.Router()

// login for recruiters or applicants
router.post('/Login' , async (req,res) =>{
    const email = req.body.email 
    const password = req.body.password
    try {
        const record = (await Recruiter.findByCredentials(email,password)) || (await Applicant.findByCredentials(email,password));
        if (record){
            const token = await record.generateAuthToken() 
            res.status(200).send({token,record})
        } else {
            throw new Error('Email or password is incorrect.')
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router