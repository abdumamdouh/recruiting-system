const express = require("express");
const db = require("../../db/db");
const fileType = require("file-type");

const RecOrApp = require("../middleware/RecOrApp");
const recruiterAuth = require("../middleware/recruiterAuth");
const applicantAuth = require("../middleware/applicantAuth");
const taskUploadmulter = require("../middleware/applicantTaskUploads");
const recTaskUpload = require("../middleware/recruiterTaskUpload");

const Task = require("../../models/Task");
const ActiveTask = require("../../models/ActiveTask");
const TaskUploads = require("../../models/TaskUploads");
const Job = require("../../models/Job");
const ApplyFor = require("../../models/ApplyFor");

const { response } = require("express");
const Applicant = require("../../models/Applicant");

const router = new express.Router();

// ************************************************************************************************

// recruiter creates a new task
// Accepted body (form-data: key - value pairs):
// task : pdf or docx file.
// data : {
//     "description":"Some discription",
//     "deadline":"2/10/2022",
//     "JobId":1,
//     "uploadFormat":"zip-rar"(default value) (optional)
// }
router.post(
    "/createTask",
    recruiterAuth,
    recTaskUpload.single("task"),
    async (req, res) => {
        try {
            // console.log(req.file);
            // console.log(req.body.data);
            // console.log(req.body);
            req.body.data = JSON.parse(req.body.data);
            // creating the task
            const task = await Task.create({
                title: req.body.data.title,
                description: req.body.data.description,
                RecruiterId: req.recruiter.id,
                uploadFormat: req.body.data.uploadFormat
                    ? req.body.data.uploadFormat
                    : "zip-rar",
                additionalFile: req.file !== undefined ? req.file.buffer : ""
            });
            // adding it to the active tasks table
            await ActiveTask.create({
                TaskId: task.dataValues.id,
                JobId: req.body.data.JobId,
                deadline: req.body.data.deadline
            });
            res.status(201).send("Task created successfully.");
        } catch (error) {
            // console.log(req.body);
            res.status(400).send(error.message);
        }
    }
);
//returned JSON: "Task created successfully."

// ****************************************************************************************************

// applicants uploading there tasks
// Accepted body (form-data: task - value pairs)
// task: task upload.
router.post(
    "/uploadTask/:JobId/:TaskId",
    applicantAuth,
    taskUploadmulter.single("task"),
    async (req, res) => {
        try {
            // checking if you are authorized to deal with this task
            const assigned = await ApplyFor.findOne({
                attributes: ["assigned"],
                where: {
                    JobId: req.params.JobId,
                    ApplicantId: req.applicant.id
                },
                raw: true
            });
            // console.log(assigned)
            if (!assigned) {
                throw new Error("You did not apply for this job");
            }
            assignedObj = JSON.parse(assigned.assigned);

            //\"2\"
            if (!assignedObj.tasks.includes(req.params.TaskId)) {
                throw new Error("You are not assigned this task.");
            }
            await TaskUploads.create({
                JobId: req.params.JobId,
                TaskId: req.params.TaskId,
                uploadedTask: req.file.buffer,
                ApplicantId: req.applicant.id
            });

            // removing the task id from the assigned tasks after submission 
            const deletedIndex = assignedObj.tasks.indexOf(req.params.TaskId)
            assignedObj.tasks.splice(deletedIndex,1)
            await ApplyFor.update({
                assigned:JSON.stringify(assignedObj)
            },{
                where:{
                    JobId: req.params.JobId,
                    ApplicantId: req.applicant.id
                }
            });
            res.status(201).send("Task uploaded successfully.");
        } catch (error) {
            // console.log(error);
            res.status(400).send(error.message);
        }
    }
);

// returned JSON:
// 1-) "You did not apply for this job"
// 2-) "You are not assigned this task."
// 3-) "Task uploaded successfully."

// **************************************************************************************************

// recruiter can see all of a certain task details
// Accepted JSON: None
router.get("*/:JobId/:TaskId/taskDetails", recruiterAuth, async (req, res) => {
    try {
        // checking if you're the one who posted this job or not
        const result = await Job.findOne({
            attributes: ["RecruiterId"],
            where: {
                id: req.params.JobId
            },
            raw: true
        });
        if (req.recruiter.id !== result.RecruiterId) {
            throw new Error("You are not authorized to view this job");
        }
        // getting all tasks uploaded by the applicants
        const solutions = await TaskUploads.findAll({
            attributes: [
                "ApplicantId",
                "uploadedTask",
                "createdAt",
                "score",
                "feedback"
            ],
            where: {
                JobId: req.params.JobId,
                TaskId: req.params.TaskId
            }
        });
        for (let i = 0; i < solutions.length; i++) {
            if (Buffer.byteLength(solutions[i].uploadedTask)) {
                const buffer = solutions[i].uploadedTask;
                solutions[i].dataValues.type = fileType(buffer);
            }
            solutions[i].dataValues.applicantName = await Applicant.findOne({
                attributes: ["firstName", "lastName"],
                where: {
                    id: solutions[i].ApplicantId
                }
            });
        }
        res.send(solutions);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// retruned JSON:
// [
//     {
//         "ApplicantId": 1,
//         "uploadedTask": {
//             "type": "Buffer",
//             "data": []
//         },
//         "createdAt": "2022-04-28T14:18:17.000Z",
//         "score": null,
//         "feedback": null,
//         "type": {
//             "ext": "pdf",
//             "mime": "application/pdf"
//         },
//           "applicantName": {
//                      "firstName": "Marwan",
//                      "lastName": "Emad"
//                    }
//     }
// ]

// ************************************************************************************************
// recruiter can give score and feedback to a certain task upload
// Accepted JSON: {
//     "JobId":1,
//     "TaskId":1,
//     "Marks":[
//         {
//             "applicantId":1,
//             "score": 4,
//             "feedback":"Some feedback"
//         }
//     ]
// }
router.post("/setTaskMark", recruiterAuth, async (req, res) => {
    try {
        // checking if you're the one who posted this job or not
        const result = await Job.findOne({
            attributes: ["RecruiterId"],
            where: {
                id: req.body.JobId
            },
            raw: true
        });
        if (req.recruiter.id !== result.RecruiterId) {
            throw new Error("You are not authorized to view this job");
        }

        req.body.Marks.forEach((Mark) => {
            TaskUploads.update(
                {
                    score: Mark.score,
                    feedback: Mark.feedback
                },
                {
                    where: {
                        JobId: req.body.JobId,
                        TaskId: req.body.TaskId,
                        ApplicantId: Mark.applicantId
                    }
                }
            );
        });
        res.send();
    } catch (error) {
        res.send(error.message);
    }
});

// ************************************************************************************************

// get all available tasks
// Accepted JSON: None
router.get("/:JobId/allTasks/:pageNumber", recruiterAuth, async (req, res) => {
    try {
        const { pageNumber } = req.params;
        
        const taskIds = await ActiveTask.findAll({
            attributes: ["TaskId"],
            where: {
                JobId: req.params.JobId
            },
            raw: true
        });

        const result = await Task.findAndCountAll({
            attributes: [
                "title",
                "description",
                "uploadFormat",
                "id",
                "createdAt"
            ],
            where: {
                RecruiterId: req.recruiter.id
            },
            offset: (pageNumber - 1) * 4,
            limit: 4
        });
        
        const allTasks = result.rows
        const count = result.count 
        const tasks = {
            relatedToThisJob: [],
            createdPrevByYou: []
        };

        allTasks.forEach((task) => {
            if (taskIds.find((element) => element.TaskId === task.dataValues.id) !== undefined) {
                tasks.relatedToThisJob.push(task);
            } else {
                tasks.createdPrevByYou.push(task);
            }
        });
        res.send({tasks,count});
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// retruned JSON:
// {
//     "relatedToThisJob": [
//         {
//             "title": "some title",
//             "description": "Shit",
//             "uploadFormat": "pdf",
//             "id": 4,
//             "createdAt": "2022-04-24T11:48:22.000Z"
//         }
//     ],
//     "createdPrevByYou": [
//         {
//             "title": "some title",
//             "description": "Some discription",
//             "uploadFormat": "pdf",
//             "id": 1,
//             "createdAt": "2022-04-24T11:46:51.000Z"
//         },
//         {
//             "title": "some title",
//             "description": "Shit",
//             "uploadFormat": "pdf",
//             "id": 2,
//             "createdAt": "2022-04-24T11:47:15.000Z"
//         },
//         {
//             "title": "some title",
//             "description": "Shit",
//             "uploadFormat": "pdf",
//             "id": 3,
//             "createdAt": "2022-04-24T11:48:14.000Z"
//         }
//     ]
// }

// ************************************************************************************************

// get a single task view for (recruiter,applicant)
// Accepted JSON: None
router.get("/:JobId/:TaskId", RecOrApp, async (req, res) => {
    try {
        if (req.recruiter) {
            // checking if you're the one who posted this job or not
            const record = await Job.findOne({
                attributes: ["RecruiterId"],
                where: {
                    id: req.params.JobId
                },
                raw: true
            });
            if (req.recruiter.id !== record.RecruiterId) {
                throw new Error("You are not authorized to view this job.");
            }
            let result = {};
            result.data = await Task.findOne({
                attributes: [
                    "title",
                    "description",
                    "uploadFormat",
                    "additionalFile"
                ],
                where: {
                    id: req.params.TaskId
                },
                raw: true
            });
            // console.log(Buffer.byteLength(result.data.additionalFile))
            if (Buffer.byteLength(result.data.additionalFile)) {
                const buffer = result.data.additionalFile;
                result.data.type = fileType(buffer);
            } else {
                delete result.data.additionalFile;
            }
            result.deadline = (
                await ActiveTask.findOne({
                    attributes: ["deadline"],
                    where: {
                        JobId: req.params.JobId,
                        TaskId: req.params.TaskId
                    },
                    raw: true
                })
            ).deadline;

            result.Uploaded_count = await TaskUploads.count({
                attributes: ["id"],
                where: {
                    TaskId: req.params.TaskId,
                    JobId: req.params.JobId
                },
                raw: true
            });
            res.send(result);
        } else if (req.applicant) {
            // checking if you are authorized to deal with this task
            const assigned = await ApplyFor.findOne({
                attributes: ["assigned"],
                where: {
                    JobId: req.params.JobId,
                    ApplicantId: req.applicant.id
                },
                raw: true
            });
            if (!assigned) {
                throw new Error("You did not apply for this job.");
            }
            const assignedObj = JSON.parse(assigned.assigned);
            if (!assignedObj.tasks.includes(req.params.TaskId)) {
                throw new Error("You are not assigned this task.");
            }
            let result = {};
            result.data = await Task.findOne({
                attributes: [
                    "title",
                    "description",
                    "uploadFormat",
                    "additionalFile"
                ],
                where: {
                    id: req.params.TaskId
                },
                raw: true
            });
            if (Buffer.byteLength(result.data.additionalFile)) {
                const buffer = result.data.additionalFile;
                result.data.type = fileType(buffer);
            } else {
                delete result.data.additionalFile;
            }
            result.deadline = (
                await ActiveTask.findOne({
                    attributes: ["deadline"],
                    where: {
                        JobId: req.params.JobId,
                        TaskId: req.params.TaskId
                    },
                    raw: true
                })
            ).deadline;
            res.send(result);
        }
    } catch (error) {
        res.status(403).send(error.message);
    }
});
// Returned JSON:
// For Applicants:
// {
//     "data": {
//         "description": "Some discription",
//         "uploadFormat": "zip-rar",
//         "additionalFile": {
//                              "type":"Buffer",
//                              "data":[]
//                           },
//          "type": {
//              "ext": "pdf",
//              "mime": "application/pdf"
//          }
//      },
//     "deadline": "2022-02-09T22:00:00.000Z"
// }

// For Recruiters:
// {
//     "data": {
//         "description": "Some discription",
//         "uploadFormat": "zip-rar",
//         "additionalFile": {
//                              "type":"Buffer",
//                              "data":[]
//                           }
//     },
//          "type": {
//              "ext": "pdf",
//              "mime": "application/pdf"
//          }
//     "deadline": "2022-02-09T22:00:00.000Z",
//     "Uploaded_count": 1
// }

module.exports = router;
