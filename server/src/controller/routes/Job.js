const express = require('express')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')
const Job = require('../../models/Job')
const Requirment = require('../../models/Requirment')
const ApplyFor = require('../../models/ApplyFor')
const Sequelize = require('sequelize')
const db = require('../../db/db')

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
        const newJob = await Job.create( job )
        await newJob.addRequirments(job.stack)
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
                include: [{
                    model: Recruiter,
                    attributes:['company'],
                    // INNER JOIN
                    required: true
                   }],
                attributes: ['id','title', 'workPlaceType'
                ,'employmentType','careerLevel','place','createdAt'],
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

// Get job info for the applicant and job stats for the recruiter
router.get('/jobs/:id', RecOrApp, async (req,res) =>{
    try{
        if (req.applicant){
            const job = await Job.findOne({
                include: [{
                    model: Recruiter,
                    attributes:['company'],
                    // INNER JOIN
                    required: true
                },{
                    model: Requirment,
                    attributes:['name'],
                    // INNER JOIN
                    required: true
                }],
                where: {
                    id: req.params.id
                }
            })
            res.send(job)
        } else if (req.recruiter){
            const job = await Job.findOne({
                include: [{
                    model: Recruiter,
                    attributes:['company'],
                    // INNER JOIN
                    required: true
                },{
                    model: Requirment,
                    attributes:['name','weight'],
                    // INNER JOIN
                    required: true
                }],
                where : {
                    id: req.params.id,
                    RecruiterId : req.recruiter.id,
                }
            })
            if(job) {
                // get applicants(Names,IDs) applied for that job
                const [results, metadata] = await db.query("SELECT A.userName,A.id FROM ApplyFors AS AF INNER JOIN Applicants AS A ON AF.ApplicantId = A.id WHERE AF.JobId=?",{
                    replacements: [job.id]
                });
                job.dataValues.applicants = results
                res.send(job)
            }
            else {
                throw new Error("You are not authorized to view this job")
            }
        }
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
            include: [{
                model: Recruiter,
                attributes:['company'],
                // INNER JOIN
                required: true
               }],
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
        Object.keys(req.body).forEach(title => job[title] = req.body[title]);
        await job.save();
        res.send(job);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Apply for a job
router.post('/jobs/applyFor/:id', applicantAuth, async (req,res) =>{

    const job = {
        JobId: req.params.id,
        ApplicantId: req.applicant.id,
    }

    try{
            const applicant = await ApplyFor.findOne({
                where: job
            })
            if( applicant ) {
                throw new Error("This Applicant already applied for the job")
            } else { 
                const jobApply = await ApplyFor.create(job)
                res.send("Applied for the job successfully")
            }
        } catch (error) {
        res.status(400).send(error.message)
    }
}) 






module.exports = router