const express = require("express");
const db = require("../../db/db");


const CodingProblemBank = require("../../models/CodingProblemBank")
const TestCases = require("../../models/TestCases")
const ActiveCodingProblem = require("../../models/ActiveCodingProbelms")
const ApplyFor = require("../../models/ApplyFor")
const Job = require("../../models/Job");


const recruiterAuth = require('../middleware/recruiterAuth') 
const applicantAuth = require('../middleware/applicantAuth')
const { Op } = require('@sequelize/core');


// YYYY-MM-DD HH:MI:SS
const router = new express.Router();

// sumbit a coding problem to the coding problems bank
// body must contain deadline and diraution as well as job_id
router.post('/SubmitCodingProblem', recruiterAuth , async (req,res) => {
    try {
        req.body.recruiterId = req.recruiter.id
        const codingProblem = await CodingProblemBank.create(req.body)
        const testcases = req.body.testcases 
        
        testcases.forEach(async testCase => {
            await TestCases.create({
                inputs:JSON.stringify(testCase.inputs),
                outputs:JSON.stringify(testCase.outputs),
                codingProblemId:codingProblem.id
            })
        });
        await ActiveCodingProblem.create({
            codingProblemId:codingProblem.id,
            jobId:req.body.jobId,
            deadline:req.body.deadline,
            duration:req.body.duration
        })
        res.status(201).send("Problem added successfully.")
    } catch (error) {
        res.send(error.message)
    }
})

// assign coding problem to the filtered applicants (Update status in apply for table)
// body contains job id with applicants ids that will be assigned to solve the coding problem
router.post("/assignProblemToApplicants" , recruiterAuth , async (req,res) =>{
    try {
        const applicantsIds = req.body.applicantsIds
        const jobId = req.body.jobId

        // checking that this recruiter is the one who posted this job
        const result = await Job.findOne({
             where: { id:jobId }, 
             attributes: [
            "RecruiterId"
        ]})
        if (req.recruiter.id !== result.dataValues.RecruiterId){
            throw new Error("You are not authorized.")
        }

        applicantsIds.forEach(async applicantid => {
            await db.query(
                "UPDATE ApplyFors SET status = ? WHERE JobId = ? AND ApplicantId = ?;",
                {
                    replacements: ["Waiting for coding problem." , jobId , applicantid]
                }
            );
        })
        res.send("Assigned successfully.")        
    } catch (error) {
        res.send(error.message)
    }
})

// render coding problem from coding problem bank to applicants
// seq: job_id --> codingproblem_id (many_to_many table)
// (apply_for table) get applicants applied for this job and status "waiting for coding problem"
// render coding problem to only those applicants  
router.get("*/getCodingProblem" , applicantAuth , async (req,res) => {
    try {
        
    } catch (error) {
        res.send(error.message)
    }
})

// take the applicants problem's solution
// body must contain job_id , codingProblem_id
// this route will also analyze the applicant's solution 
// and coding problem stats table will be updated accordingly 




//get all coding problems for recruiter to choose from them:



router.post("/codingProblems",recruiterAuth, async (req, res) => {
    const pageNumber = req.body.pageNumber;
    // const Limit = req.body.limit
    try {
        const result = await CodingProblemBank.findAndCountAll({
            attributes: [
                "id",
                "description",
                "timeConstraint",
                "memoryConstraint",
                "name",
                "private",

            ],
            where:{
                [Op.or]: [
                    { private: 0 },
                    { recruiterId: req.recruiter.id }
                  ]
            },
            offset: (pageNumber - 1) * 10,
            limit: 10
        });
        res.send({
            codingProblems: result.rows,  
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});






router.post("*/submitSolution/" , applicantAuth , async(req,res) => {

})

module.exports = router;
