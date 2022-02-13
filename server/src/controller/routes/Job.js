const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')
const Job = require('../../models/Job')

const recruiterAuth = require('../middleware/recruiterAuth') 
const applicantAuth = require('../middleware/applicantAuth') 

const router = new express.Router()

// creating a job
router.post('/CreateJob', recruiterAuth, async (req,res) => {
    const job = req.body 
    job.RecruiterId = req.recruiter.id
    try {
        const post = await Job.create(job )
        res.status(200).send("Job Posted successfuly.")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get all jobs
router.get('/jobs/applicant', applicantAuth, async (req,res) =>{
    try{
        const jobs = await Job.findAll()
        res.send(jobs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}) 
router.get('/jobs/recruiter', recruiterAuth, async (req,res) =>{
    try{
        const jobs = await Job.findAll()
        res.send(jobs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}) 

// get all jobs by recruiter
router.get('/jobs/recruiter/myJobs', recruiterAuth, async (req,res) =>{
    try{
        const jobs = await Job.findAll({
            where : {
                RecruiterId : req.recruiter.id
            }
        })
        res.send(jobs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}) 




module.exports = router