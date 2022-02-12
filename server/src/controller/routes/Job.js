const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')
const Job = require('../../models/Job')

const recruiterAuth = require('../middleware/recruiterAuth') 

const router = new express.Router()

// creating a job
router.post('/CreateJob',recruiterAuth, async (req,res) => {
    const job = req.body 
    try {
        const post = await Job.create(job)
        res.status(200).send("Job Posted successfuly.")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router