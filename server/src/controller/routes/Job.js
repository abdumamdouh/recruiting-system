const express = require("express");
const _ = require("lodash");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const MCQ = require("../../models/MCQ");
const JobMCQ = require("../../models/JobMCQ");
const Requirment = require("../../models/Requirment");
const ApplyFor = require("../../models/ApplyFor");
const ActiveTask = require("../../models/ActiveTask")



const Sequelize = require("sequelize");
const db = require("../../db/db");
const Op = require("Sequelize").Op;

// requiring applicant and recruiter authentication
const recruiterAuth = require("../middleware/recruiterAuth");
const applicantAuth = require("../middleware/applicantAuth");
const RecOrApp = require("../middleware/RecOrApp");
const { where } = require("sequelize");
const { object } = require("joi");
const Task = require("../../models/Task");
const MCQStat = require("../../models/MCQStat");
const TaskUploads = require("../../models/TaskUploads");

const router = new express.Router();

// creating a job
router.post("/CreateJob", recruiterAuth, async (req, res) => {
    const job = req.body;
    job.RecruiterId = req.recruiter.id;
    job.company = req.recruiter.company;
    try {
        const newJob = await Job.create(job);
        await newJob.addRequirments(job.stack);
        res.status(200).send("Job Posted successfuly.");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all jobs Feed for applicants and recruiters
// todo --> pagination
// more optimization on Auth

router.post("/Feed", async (req, res) => {
    const pageNumber = req.body.pageNumber;
    // const Limit = req.body.limit
    try {
        const result = await Job.findAndCountAll({
            include: [
                {
                    model: Recruiter,
                    attributes: ["company", "avatar"],
                    // INNER JOIN
                    required: true
                }
            ],
            attributes: [
                "id",
                "title",
                "workPlaceType",
                "employmentType",
                "careerLevel",
                "place",
                "createdAt"
            ],
            offset: (pageNumber - 1) * 10,
            limit: 10
        });
        res.send({
            Jobs: result.rows,
            Count: result.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get job info for the applicant and job stats for the recruiter
router.get("/jobs/:id", RecOrApp, async (req, res) => {
    try {
        if (req.applicant) {
            const job = await Job.findOne({
                include: [
                    {
                        model: Recruiter,
                        attributes: ["company", "avatar"],
                        // INNER JOIN
                        required: true
                    },
                    {
                        model: Requirment,
                        attributes: ["name"],
                        // INNER JOIN
                        required: true
                    }
                ],
                where: {
                    id: req.params.id
                }
            });

            const appliedForTheJob = await ApplyFor.findOne({
                where: {
                    JobId: req.params.id,
                    ApplicantId: req.applicant.id
                }
            });
            if (appliedForTheJob) {
                job.dataValues.applied = true;
            } else {
                job.dataValues.applied = false;
            }
            // console.log(job);
            res.send(job);
        } else if (req.recruiter) {
            const job = await Job.findOne({
                include: [
                    {
                        model: Recruiter,
                        attributes: ["company", "avatar"],
                        // INNER JOIN
                        required: true
                    },
                    {
                        model: Requirment,
                        attributes: ["name", "weight"],
                        // INNER JOIN
                        required: true
                    }
                ],
                where: {
                    id: req.params.id,
                    RecruiterId: req.recruiter.id
                }
            });
            if (job) {

                job.dataValues.applicants = await applicantScores(job);
                res.send(job);

            } else {
                throw new Error("You are not authorized to view this job");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all jobs posted by a certain recruiter
router.post("/recruiter/myjobs", recruiterAuth, async (req, res) => {
    const pageNumber = req.body.pageNumber;
    // const Limit = req.body.limit
    try {
        const result = await Job.findAndCountAll({
            include: [
                {
                    model: Recruiter,
                    attributes: ["company", "avatar"],
                    // INNER JOIN
                    required: true
                }
            ],
            attributes: [
                "id",
                "title",
                "workPlaceType",
                "employmentType",
                "careerLevel"
            ],
            where: {
                RecruiterId: req.recruiter.id
            },
            offset: (pageNumber - 1) * 10,
            limit: 10
        });
        res.send({
            Jobs: result.rows,
            Count: result.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all jobs applicant applied for
router.post("/applicant/myjobs", applicantAuth, async (req, res) => {
    const pageNumber = req.body.pageNumber;
    const applicantId = req.applicant.id;

    try {
        const jobs = await db.query(
            "SELECT J.id,J.description,J.workPlaceType,J.employmentType,J.title,J.yearsOfExperience,J.careerLevel,J.place,AF.createdAt,AF.status FROM Jobs AS J INNER JOIN ApplyFors AS AF ON J.id = AF.JobId WHERE AF.ApplicantId=? LIMIT ?,10",
            {
                replacements: [applicantId, pageNumber - 1]
            }
        );
        // console.log(jobs)
        res.send(jobs);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// edit a job by recruiter
router.patch("/jobs/:id", recruiterAuth, async (req, res) => {
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
        Object.keys(req.body).forEach(
            (title) => (job[title] = req.body[title])
        );
        if (req.body.stack.length) {
        
            Requirment.destroy({ where: { JobId: job.id }, force: true });
            const requirements = req.body.stack.map((requirment) => ({
                name: Object.keys(requirment)[0],
                weight: Object.values(requirment)[0],
                JobId: job.id
            }));
            Requirment.bulkCreate(requirements);
            _.set(
                job.dataValues,
                "stack",
                requirements.map((requirement) =>
                    _.omit(requirement, ["JobId"])
                )
            );
        }
        // console.log(requirements);
        await job.save();
        res.send(job);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Apply for a job
router.post("/jobs/applyFor/:id", applicantAuth, async (req, res) => {
    const job = {
        JobId: req.params.id,
        ApplicantId: req.applicant.id
    };

    try {
        const applicant = await ApplyFor.findOne({
            where: job
        });
        if (applicant) {
            throw new Error("This Applicant already applied for the job");
        } else {
            const jobApply = await ApplyFor.create(job);
            res.send("Applied for the job successfully");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all availale tasks of the job
router.get("/getAllTasks/:id", recruiterAuth, async (req, res) => {
    try {
        const jobId = req.params.id;

        const mcqs = await JobMCQ.findAndCountAll({
            include: {
                model: MCQ,
                attributes: ["title"]
            },
            attributes: ["MCQId", "expiryDate"],
            where: {
                jobId: jobId,
                expiryDate: {
                    [Op.gt]: new Date()
                }
            }
        });

        res.send({
            MCQs: mcqs.rows,
            Count: mcqs.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// assign the diffrent tasks of the job to applicants
router.post("/assignTasks", recruiterAuth, async (req, res) => {
    try {
        const jobId = req.body.jobId;

        if (req.body.MCQ) {
            const mcq = req.body.MCQ;
            const MCQId = mcq.MCQId;

            const mcqRecord = await MCQ.findByPk(MCQId);
            if(!mcqRecord) {
                throw new Error("This MCQ id is invalid");
            }

            const jobRecord = await Job.findByPk(jobId);
            if(!jobRecord) {
                throw new Error("This Job id is invalid");
            } else if ( jobRecord.RecruiterId !== req.recruiter.id ) {
                throw new Error("You are not authorized to view this job");
            }

            const applicants = await ApplyFor.findAll({
                // attributes: ["assigned"],
                where: {
                    jobId: jobId,
                    ApplicantId: {
                        [Op.in]: mcq.applicants
                    }
                }
            });
            if(!applicants.length) {
                throw new Error("Applicants are not applied for this job");
            } else if (applicants.length !== mcq.applicants.length) {
                throw new Error("Applicants are not applied for this job");
            } else {
                applicants.forEach(async (applicant) => {
                    const assigned = JSON.parse(applicant.dataValues.assigned);
    
                    // console.log(assigned)
                    assigned.MCQs.push(MCQId);
                    assigned.MCQs = assigned.MCQs.filter(
                        (v, i, a) => a.indexOf(v) === i
                    );
                    applicant.assigned = JSON.stringify(assigned);
                    // console.log(typeof applicant)
                    await applicant.save();
                });
            }

            res.send("MCQ Assigned");
        } else if (req.body.codingProblem) {
            const codingProblems = req.body.codingProblem;
        } else if (req.body.task) {
            const task = req.body.task;
            const TaskId = task.TaskId;

            const taskRecord = await ActiveTask.findOne({
                where: {
                    TaskId:TaskId}
            });
            if(!taskRecord) {
                throw new Error("This task is not Active");
            }

            const jobRecord = await Job.findByPk(jobId);
            if(!jobRecord) {
                throw new Error("This Job id is invalid");
            } else if ( jobRecord.RecruiterId !== req.recruiter.id ) {
                throw new Error("You are not authorized to view this job");
            }

            const applicants = await ApplyFor.findAll({
                // attributes: ["assigned"],
                where: {
                    jobId: jobId,
                    ApplicantId: {
                        [Op.in]: task.applicants
                    }
                }
            });
            if(!applicants.length) {
                throw new Error("No applicants applied for this job");
            } else if (applicants.length !== task.applicants.length) {
                throw new Error("No applicants applied for this job");
            } else {
                applicants.forEach(async (applicant) => {
                    const assigned = JSON.parse(applicant.dataValues.assigned);
    
                    // console.log(assigned)
                    assigned.tasks.push(TaskId);
                    assigned.tasks = assigned.tasks.filter(
                        (v, i, a) => a.indexOf(v) === i
                    );
                    applicant.assigned = JSON.stringify(assigned);
                    // console.log(typeof applicant)
                    await applicant.save();
                });
            }
            res.send("Task assigned successfully.");
        } else {
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/report/:id", recruiterAuth, async (req, res) => {
    try {


        const jobId = req.params.id;
        const applicantsApplied = await ApplyFor.count({
            where: {
                JobId: jobId
            }
        })

        // Candidates = 50%

        
        // const mcqs = await JobMCQ.findAndCountAll({
        //     include: {
        //         model: MCQ,
        //         attributes: ["title"],
        //     },
        //     attributes: ["MCQId"],
        //     where: {
        //         jobId: jobId
        //     }
        // });

        // const mcqResults = await MCQStat.findAll({
        //     attributes: ["applicantId","MCQId", "score"],
        //     where: {
        //         jobId: jobId
        //     }

        // }) 

        let mcqsStats = await db.query(
            "SELECT A.firstName, A.lastName, M.title, MS.score  FROM mcqstats AS MS INNER JOIN Applicants AS A ON MS.ApplicantId = A.id INNER JOIN mcqs AS M ON MS.MCQId = M.id WHERE MS.JobId=?;",
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );

        
        
        mcqsStats = mcqsStats.map( (mcq) => {
            obj = {}
            obj[mcq.title] = { 
                applicantName : `${mcq.firstName} ${mcq.lastName}`,
                score : mcq.score
            }  
            return obj
        })
        
        const mcqsResults = {};
        mcqsStats.forEach((mcq) => {
            console.log(mcq)
            const key = Object.keys(mcq)[0];
            const value = Object.values(mcq)[0];
            let values = mcqsResults[key] || [];
            values.push( value );
            mcqsResults[key] = values;
        })

        const average_MCQS_score = await db.query(
            "SELECT MCQId, AVG(score) AS average_MCQ_score FROM mcqstats GROUP BY MCQId;", 
            {
                type: db.QueryTypes.SELECT
            }
        );


        const overallMCQs = await db.query(
            "SELECT A.firstName , A.lastName, MS.applicantId, SUM(MS.score) AS overallMCQsScore FROM mcqstats AS MS  INNER JOIN applicants AS A ON  MS.applicantId = A.id WHERE MS.jobId = ? GROUP BY MS.applicantId;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
        // const overallMCQs = await MCQStat.findAll({
        //     attributes: [
        //       'applicantId',
        //       [Sequelize.fn('sum', Sequelize.col('score')), 'overallMCQsScore'],
        //     ],
        //     where: {
        //         jobId: jobId
        //     },
        //     group: ['applicantId'],
        //     raw: true
        // });

        // const overallTasks = await TaskUploads.findAll({
        // attributes: [
        //     'applicantId',
        //     [Sequelize.fn('sum', Sequelize.col('score')), 'overallTasksScore'],
        // ],
        // where: {
        //     jobId: jobId
        // },
        // group: ['applicantId'],
        // raw: true
        // }); 
          

        // console.log(average_MCQS_score)
        // const tasks = await TaskUploads.findAndCountAll({
        //     include: {
        //         model: Task,
        //         attributes: ["title"]

        //     },
        //     attributes: ["TaskId"],
        //     where: {
        //         jobId: jobId,
        //     }
        // });

        // const taskResults = await TaskUploads.findAll({
        //     attributes: ["ApplicantId","TaskId", "score"],
        //     where: {
        //         jobId: jobId
        //     }
        // }) 
        const taskStats = await db.query(
            "SELECT A.userName, T.title, TA.score  FROM `gp-db`.taskuploads AS TA INNER JOIN `gp-db`.Applicants AS A ON TA.ApplicantId = A.id INNER JOIN `gp-db`.tasks AS T ON TA.taskId = T.id WHERE TA.JobId=?;",
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
        
        tasksResults = taskStats.map( (task) => {
            obj = {}
            obj[task.title] = { 
                applicantName : task.userName,
                score : task.score
            }  
            return obj
        })

        const average_Tasks_score = await db.query( "SELECT TaskId, AVG(score) AS average_Task_score FROM `gp-db`.taskuploads GROUP BY TaskId;" ,
            {
                type: db.QueryTypes.SELECT
            }
            
        );

        const overallTasks = await db.query(
            "SELECT A.firstName , A.lastName, TU.applicantId, SUM(TU.score) AS overallTasksScore FROM taskuploads AS TU  INNER JOIN applicants AS A ON  TU.applicantId = A.id WHERE TU.jobId = ? GROUP BY TU.applicantId;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );

        const overallScore = overallMCQs.map( (mcq) => {
            const task = overallTasks.find( (task) => {
                return task.applicantId === mcq.applicantId 
            }) 
            
            return {
                applicantName: `${mcq.firstName} + ${mcq.lastName}`,
                applicantId: mcq.applicantId,
                overallScore: Math.round( parseFloat(mcq.overallMCQsScore) + parseFloat(task.overallTasksScore))
            }
        })


        res.send({
            mcqsResults : mcqsResults,
            tasksResults: tasksResults,
            applicantsAppliedCount: applicantsApplied,
            avgMCQsScore: average_MCQS_score,
            avgTasksScore: average_Tasks_score,
            // overallMCQs: overallMCQs,
            // overallTasks: overallTasks,
            overallScore: overallScore

            // MCQs: mcqs.rows,
            // MCQSCount: mcqs.count,
            // tasks: tasks.rows,
            // tasksCount: tasks.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a job
router.delete("/DeleteJob/:id", recruiterAuth, async (req, res) => {
    const JobId = req.params.id;
    try {
        const job = await Job.findByPk(JobId);
        if (job) {
            job.destroy();
            res.send("Job deleted successfully.");
        } else {
            throw new Error("Could not delete that job");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
