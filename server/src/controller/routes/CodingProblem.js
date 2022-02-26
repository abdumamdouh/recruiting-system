const express = require("express");
const CodingProblemBank = require("../../models/CodingProblemBank")
const TestCases = require("../../models/TestCases")


const recruiterAuth = require('../middleware/recruiterAuth') 

const router = new express.Router();

// sumbit a coding problem to the coding problems bank
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
        res.status(201).send("Problem added successfully.")
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router;
