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

router.get('/jobs/:id', RecOrApp, async (req,res) =>{
    try{
        if (req.applicant){
            const job = await Job.findById(req.params.id)
            const jobData = await job.getJobData()
            res.send(jobData)
        } else if (req.recruiter){
            const job = await Job.findOne({
                where : {
                    id: id,
                    RecruiterId : req.recruiter.id,
                }
            })

            if(job) {
                jobStats = await job.getJobStats() 
                res.send(jobStats)
            }
            else {
                throw new Error("You are not authorized to view this job")
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}) 




// edit a job by recruiter
router.patch('/jobs/:id', recruiterAuth, async (req, res) => {
    try {
        const job = await Job.findOne({ 
            where: { 
                id: req.params.id,
                RecruiterId: req.recruiter.id 
            } 
        });
        if (!job) {
            return res.status(404).send();
        }
        Object.keys(req.body).forEach(title => job[title] = req.body[title]);
        await job.save();
        res.send(job);
    } catch (error) {
        res.status(400).send(error.message);
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