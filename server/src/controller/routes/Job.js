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

router.get('/Feed', RecOrApp ,async (req,res) =>{
    const Offset = req.body.offset
    // const Limit = req.body.limit
    try{
        if (req.applicant){
            const result = await Job.findAndCountAll({
                attributes: ['id','title', 'workPlaceType'
                ,'employmentType','careerLevel'],
                offset:Offset,
                limit:10
            })
            res.send(result.rows)
        } else if (req.recruiter){
            const result = await Job.findAndCountAll({
                attributes: ['id','title', 'workPlaceType','employmentType','careerLevel'],
                where : {
                    RecruiterId : req.recruiter.id
                },
                offset:Offset,
                limit:10
            })
            res.send(result.rows)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}) 


// get all jobs recruiter's view
// router.get('/jobs/recruiter', recruiterAuth, async (req,res) =>{
//     try{
//         const jobs = await Job.findAll()
//         res.send(jobs)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }) 



module.exports = router