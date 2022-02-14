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
    job.company=req.recruiter.company
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

router.post('/Feed',async (req,res) =>{
    const pageNumber = req.body.pageNumber
    // const Limit = req.body.limit
    try{
            const result = await Job.findAndCountAll({
                attributes: ['id','title', 'workPlaceType'
                ,'employmentType','careerLevel','createdAt'],
                offset:(pageNumber-1)*10,
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
    const pageNumber = req.body.pageNumber
    // const Limit = req.body.limit
    try{
        const result = await Job.findAndCountAll({
            attributes: ['id','title', 'workPlaceType','employmentType','careerLevel'],
            where : {
                RecruiterId : req.recruiter.id
            },
            offset:(pageNumber-1)*10,
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
        res.body.forEach(title => job[title] = req.body[title]);
        await job.save();
        res.send(job);
    } catch (error) {
        res.status.send(error.message);
    }
})






module.exports = router