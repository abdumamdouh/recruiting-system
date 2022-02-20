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
const { where } = require('sequelize')

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

                // calculate the score of each applicant and append it to each applicant
                for (let index = 0; index < results.length; index++ ){
                    const a = results[index];
                                        let aScore = 0
                    const applicantA = await Applicant.findOne({
                        where : {
                            id : a.id
                        }
                    })
                    
                    for (let index = 0; index < applicantA.qualifications.length; index++) {
                        const qualification = applicantA.qualifications[index];
                        const requirmentObj = await job.Requirments.find( (req) => {
                            return req.name == Object.keys(qualification)
                        })

                        if(requirmentObj){
                            aScore = aScore + requirmentObj.weight * Object.values(qualification)[0] 
                        }
                    }                    
                    results[index].score = aScore
                }

                // sort the applicants by the score
                results.sort( (a,b) => {
                    return b.score - a.score
                })
                console.log(results)
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
router.post('/recruiter/myjobs', recruiterAuth, async (req,res) =>{
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

// get all jobs applicant applied for
router.post('/applicant/myjobs', applicantAuth, async (req,res) =>{
    const pageNumber = req.body.pageNumber
    const applicantId = req.applicant.id

    try{
        const jobs = await db.query('SELECT J.id,J.description,J.workPlaceType,J.employmentType,J.title,J.yearsOfExperience,J.careerLevel,J.place,AF.createdAt,AF.status FROM Jobs AS J INNER JOIN ApplyFors AS AF ON J.id = AF.JobId WHERE AF.ApplicantId=? LIMIT ?,10',{
            replacements: [applicantId,pageNumber-1]
        })
        // console.log(jobs)
        res.send(jobs)
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
router.post('/jobs/applyFor/:id', applicantAuth , async (req,res) =>{

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

// Delete a job 
router.delete('/DeleteJob/:id' , recruiterAuth , async (req,res) =>{
    const JobId = req.params.id 
    try {
        const job = await Job.findByPk(JobId)
        if (job){
            job.destroy()
            res.send("Job deleted successfully.")
        } else {
            throw new Error('Could not delete that job')
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})




module.exports = router