const express = require("express");


const RecOrApp = require("../middleware/RecOrApp");
const recruiterAuth = require('../middleware/recruiterAuth');
const applicantAuth = require("../middleware/applicantAuth");
const taskUploadmulter = require("../middleware/TaskUploadsMulter")

const Task = require('../../models/Task');
const ActiveTask = require('../../models/ActiveTask');
const TaskUploads = require('../../models/TaskUploads');
const Job = require('../../models/Job');
const { response } = require("express");

const router = new express.Router();

// ************************************************************************************************

// recruiter creates a new task
// Accepted JSON:
// {
//     "description":"Some discription",
//     "deadline":"2/10/2022",
//     "JobId":1,
//     "uploadFormat":"zip-rar" (optional)
// }
router.post('/createTask' , recruiterAuth ,async (req,res) => {
    try {
        // craeting the task
        const task = await Task.create({
            description:req.body.description,
            RecruiterId: req.recruiter.id ,
            uploadFormat: req.recruiter.uploadFormat ? req.recruiter.uploadFormat:"zip-rar" 
        })
        // adding it to the active tasks table
        await ActiveTask.create({
            TaskId:task.dataValues.id,
            JobId:req.body.JobId,
            deadline:req.body.deadline
        })
        res.status(201).send("Task created successfully.");
    } catch (error) {
        res.status(401).send(error.message)
    }
})
//returned JSON: None

// ****************************************************************************************************

// applicants uploading there tasks
// Accepted JSON: None, just the uploaded file 
router.post('/uploadTask/:TaskId/:JobId' , applicantAuth , taskUploadmulter.single('task'), async (req,res) => {
    try {
        await TaskUploads.create({
            JobId:req.params.JobId,
            TaskId:req.params.TaskId,
            uploadedTask:req.file.buffer,
            ApplicantId:req.applicant.id
        })
        res.status(201).send("Task uploaded successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// returned JSON: None

// **************************************************************************************************

// recruiter can see all of a certain task uploades  
// Accepted JSON: None
router.get('*/:JobId/:TaskId/uploadedTasks' , recruiterAuth ,async (req,res) => {
    try {
        // checking if you're the one who posted this job or not
        const result = await Job.findOne({
            attributes:['RecruiterId'],
            where:{
                id:req.params.JobId
            },
            raw:true
        })
        if (req.recruiter.id !== result.RecruiterId){
            throw new Error("You are not authorized to view this job")
        }
        // getting all tasks uploaded by the applicants
        const solutions = await TaskUploads.findAll({
            attributes:['ApplicantId','uploadedTask','createdAt'],
            where:{
                JobId:req.params.JobId,
                TaskId:req.params.TaskId
            }
        })
        res.send(solutions)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// retruned JSON: 
// [
//     {
//         "ApplicantId": 1,
//         "uploadedTask": {
//             "type": "Buffer",
//             "data": []
//         },
//         "createdAt": "2022-03-13T11:08:37.000Z"
//     }
// ]

// ************************************************************************************************

// get all previous tasks done by a recruiter 
// Accepted JSON: None
router.get('/allTasks', recruiterAuth , async (req,res) => {
    try {
        const tasks = await Task.findAll({
            attributes:['description','uploadFormat'],
            where:{
                RecruiterId:req.recruiter.id
            }
        })
        res.send(tasks)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// retruned JSON: 
// [
//     {
//         "description": "Some discription",
//         "uploadFormat": "zip-rar"
//     }
// ]

// ************************************************************************************************

// get a single task view for (recruiter,applicant)
// Accepted JSON: None
router.get('/:JobId/:TaskId' , RecOrApp , async (req,res) =>{
    try {
        if(req.recruiter){
            const result = await db.query(
                `Select T.description,AT.deadline,count(TU.id) FROM tasks AS T
                 INNER JOIN activetasks AS AT ON T.id = AT.TaskId 
                 INNER JOIN taskuploads AS TU ON T.id = TU.TaskId
                 WHERE T.id = ${req.params.TaskId}
                 AND (AT.JobId = ${req.params.JobId} AND AT.TaskId = ${req.params.TaskId})
                 AND (TU.JobId = ${req.params.JobId} AND TU.TaskId = ${req.params.TaskId})`
            );
            res.send(result);
        } else if (req.applicant){

        }
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;
