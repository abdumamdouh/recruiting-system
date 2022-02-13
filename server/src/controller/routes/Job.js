const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')
const Job = require('../../models/Job')

// requiring applicant and recruiter authentication
const recruiterAuth = require('../middleware/recruiterAuth') 
const applicantAuth = require('../middleware/applicantAuth') 
const RecOrApp = require('../middleware/RecOrApp')

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

// get all jobs Feed for applicants and recruiters 
// todo --> pagination
// more optimization on Auth

router.get('/Feed',async (req,res) =>{
    const Offset = req.body.offset
    // const Limit = req.body.limit
    try{
            const result = await Job.findAndCountAll({
                attributes: ['id','title', 'workPlaceType'
                ,'employmentType','careerLevel'],
                offset:Offset,
                limit:10
            })
            res.send({
                Jobs:result.rows,
                Count:result.count
            })
        } catch (error) {
        res.status(400).send(error.message)
    }
}) 

// get all jobs posted by a certain recruiter
router.get('/recruiter/myjobs', recruiterAuth, async (req,res) =>{
    const Offset = req.body.offset
    // const Limit = req.body.limit
    try{
        const result = await Job.findAndCountAll({
            attributes: ['id','title', 'workPlaceType','employmentType','careerLevel'],
            where : {
                RecruiterId : req.recruiter.id
            },
            offset:Offset,
            limit:10
            })
            res.send({
                Jobs:result.rows,
                Count:result.count
            })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router