const express = require("express");


const RecOrApp = require("../middleware/RecOrApp");
const recruiterAuth = require('../middleware/recruiterAuth');
const applicantAuth = require("../middleware/applicantAuth");

const Task = require('../../models/Task');
const ActiveTask = require('../../models/ActiveTask');

const router = new express.Router();

router.post('/createTask' , recruiterAuth ,async (req,res) => {
    try {
        // craeting the task
        const task = await Task.create({
            description:req.body.description,
            RecruiterId: req.recruiter.id
        })
        // adding it to the active tasks table
        await ActiveTask.create({
            taskId:task.dataValues.id,
            jobId:req.body.jobId,
            deadline:req.body.deadline
        })
        res.status(201).send("Task created successfully.");
    } catch (error) {
        res.status(401).send(error.message)
    }
})


module.exports = router;
