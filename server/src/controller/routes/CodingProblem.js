const express = require("express");
const CodingProblemBank = require("../../models/CodingProblemBank")
const CodingProblemStats = require("../../models/CodingProblemStats")
const TestCases = require("../../models/TestCases")
const ActiveCodingProblem = require("../../models/ActiveCodingProbelms")
const ApplyFor = require("../../models/ApplyFor")
const Job = require("../../models/Job");
const {writeCodeToFile,testCode,inject} = require('../helper functions/CodingProblemLogic')


const recruiterAuth = require('../middleware/recruiterAuth') 
const applicantAuth = require('../middleware/applicantAuth')
const { Op } = require('@sequelize/core');
const db = require("../../db/db");



// YYYY-MM-DD HH:MI:SS
const router = new express.Router();

// sumbit a coding problem to the coding problems bank
// body must contain deadline and diraution as well as job_id
router.post('/SubmitCodingProblem', recruiterAuth , async (req,res) => {
    try {
       // console.log(req.body)
      req.body.recruiterId=req.recruiter.id
       //console.log(req.body)

        const codingProblem = await CodingProblemBank.create(req.body)
        const testcases = req.body.testcases 
       // console.log(testcases)
        
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
router.get("*/getCodingProblem/:id" , applicantAuth , async (req,res) => {
    try { 
            const codingProblem = await CodingProblemBank.findOne({

                where: {
                    id: req.params.id
                }
            });
           const [results, metadata] = await db.query(`SELECT inputs,outputs FROM testcases WHERE codingProblemId=${req.params.id} limit 1`);

           codingProblem.dataValues.testcases=results;

           res.send(codingProblem);

        }
        catch (error) {
            res.status(400).send(error.message);
        }
})

// take the applicants problem's solution
// body must contain job_id , codingProblem_id
// this route will also analyze the applicant's solution 
// and coding problem stats table will be updated accordingly 

//get coding problem by id for recruiter with full testcases :

router.get("*/getFullCodingProblem/:id" , recruiterAuth , async (req,res) => {
    try { 
            const codingProblem = await CodingProblemBank.findOne({
                where: {
                    id: req.params.id
                }
            });
           const [results, metadata] = await db.query(`SELECT inputs,outputs FROM testcases WHERE codingProblemId=${req.params.id}`);
           codingProblem.dataValues.testcases=results;

           res.send(codingProblem);

        }
        catch (error) {
            res.status(400).send(error.message);
        }
})





//get all coding problems for recruiter to choose from them:
router.get("/codingProblems/:pageNumber",recruiterAuth, async (req, res) => {
    const {pageNumber} = req.params;
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
                "recruiterId"

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
            Count:result.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// job id , CP id , language , code --> from the client
// steps :
// read code write in a known directory with name (applicantId-jobId-CPId)
// get the test cases from the db(inputs & outputs)
// compile code based on the coming language with the retrieved test cases also set timeout
// compare output of the program with the correct output
router.post("*/submitSolution/" , applicantAuth , async(req,res) => {
    try {
        // validate that the applicant can solve the problem

        // inject time measuring code
        req.body.code = inject(req.body.code,req.body.language)

        // writing the coming code in the solutions directory
        writeCodeToFile(req.body.code,
            req.body.jobId,
            req.applicant.id,
            req.body.codingProblemId,
            req.body.language)
        
        // testing code correctness 
        const [results, metadata] = await db.query(`SELECT inputs,outputs FROM testcases WHERE codingProblemId=${req.body.codingProblemId}`);
        const [specs, Metadata] = await db.query(`SELECT timeConstraint,memoryConstraint FROM codingproblembanks WHERE id=${req.body.codingProblemId}`);
            console.log(specs)
        //to store the result of each test case
        let finalResult={};
        const index ={
                value:0,
                // object to be passed by ref.
                advance:()=>{index.value=index.value+1}
        };// represents the number of iterations 
        
        results.forEach(async testCase =>{
            // call back to be called when the last test is executed
            const cb =async()=>{  
                console.log(finalResult)
                await CodingProblemStats.create({
                    applicantId:req.applicant.id,
                    jobId:req.body.jobId,
                    codingProblemId:req.body.codingProblemId,
                    results:finalResult
                })
            }
            const numOfTests=results.length
            const correct = await testCode(req.body.code,req.body.language,5,testCase.inputs,testCase.outputs,index,numOfTests,finalResult,cb,specs)
            
            // console.log(correct)
        })
        res.send("submitted successfully")
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;
