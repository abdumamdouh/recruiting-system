const express = require("express");
const CodingProblemBank = require("../../models/CodingProblemBank")
const TestCases = require("../../models/TestCases")
const ActiveCodingProblem = require("../../models/ActiveCodingProbelms")

const recruiterAuth = require('../middleware/recruiterAuth') 
const applicantAuth = require('../middleware/applicantAuth')

// YYYY-MM-DD HH:MI:SS
const router = new express.Router();

// sumbit a coding problem to the coding problems bank
// body must contain deadline and diraution as well as job_id
router.post('/SubmitCodingProblem', recruiterAuth , async (req,res) => {
    try {
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

// Redundant route
// assign coding problem to a certain job with it's daedline and duration
// body must contain coding problem id and job id

// router.post("/assignProblemToJob" , recruiterAuth . async (req,res =>{
//     try {
        
//     } catch (error) {
//         res.send(error.message)
//     }
// }))

// assign coding problem to the filtered applicants (Update status in apply for table)
// body contains job id with applicants ids that will be assigned to solve the coding problem
router.post("/assignProblemToApplicants" , recruiterAuth , async (req,res) =>{
    try {
        
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
router.post("*/submitSolution/" , applicantAuth , async(req,res) => {

})

module.exports = router;
