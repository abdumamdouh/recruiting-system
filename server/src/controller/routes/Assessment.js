const express = require("express");
const _ = require("lodash");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const MCQ = require("../../models/MCQ");
const Task = require("../../models/Task");
const CodingProblemBank = require("../../models/CodingProblemBank");
const Requirment = require("../../models/Requirment");
const ApplyFor = require("../../models/ApplyFor");
const Sequelize = require("sequelize");
const db = require("../../db/db");
const Op = require("Sequelize").Op;

// requiring applicant and recruiter authentication
const recruiterAuth = require("../middleware/recruiterAuth");
const applicantAuth = require("../middleware/applicantAuth");
const RecOrApp = require("../middleware/RecOrApp");
const { where } = require("sequelize");
const { object } = require("joi");

const router = new express.Router();

// get the assessments of every job the applicant applied for
router.get("/assessments", applicantAuth, async (req, res) => {
    try {
        const { id: applicantId } = req.applicant;
        // console.log(applicantId);
        const data = await ApplyFor.findAll({
            where: { ApplicantId: applicantId },
            attributes: ["assigned", "JobId"],
            raw: true
        });
        data.forEach((job) => {
            job.assigned = JSON.parse(job.assigned);
        });
        // console.log(data);
        const jobs = data.filter(
            ({ assigned }) =>
                !Object.keys(assigned).every(
                    (key) => assigned[key].length === 0
                )
        );
        // console.log(jobs);
        const assessments = await Promise.all(
            jobs.map(async (job) => {
                let jobData = await Job.findByPk(job.JobId, {
                    model: Job,
                    attributes: ["id", "title", "description"],
                    include: [
                        {
                            model: Recruiter,
                            attributes: ["company", "avatar"]
                        }
                    ]
                });
                jobData = JSON.parse(JSON.stringify(jobData));
                // console.log(jobData);
                /* let everyMCQ = await MCQ.findAll({
                    where: { id: job.assigned.MCQs },
                    attributes: ["id", "title"],
                    include: [
                        {
                            model: Job,
                            where: { id: job.JobId },
                            attributes: ["id", "title", "description"],
                            include: [
                                {
                                    model: Recruiter,
                                    attributes: ["company", "avatar"]
                                }
                            ],
                            through: { attributes: ["duration", "expiryDate"] }
                        }
                    ]
                }); */
                let everyMCQ = await MCQ.findAll({
                    where: { id: job.assigned.MCQs },
                    attributes: ["id", "title"],
                    include: [
                        {
                            model: Job,
                            where: { id: job.JobId },
                            attributes: ["id"],
                            through: { attributes: ["duration", "expiryDate"] }
                        }
                    ]
                });
                everyMCQ = JSON.parse(JSON.stringify(everyMCQ));
                // console.log(everyMCQ);
                let everyTask = await Task.findAll({
                    where: { id: job.assigned.tasks },
                    attributes: ["id", "title"],
                    include: [
                        {
                            model: Job,
                            where: { id: job.JobId },
                            attributes: ["id"],
                            through: { attributes: ["deadline"] }
                        }
                    ]
                });
                everyTask = JSON.parse(JSON.stringify(everyTask));
                // console.log(everyTask[0].Jobs);
                let everyCodingProblem = await CodingProblemBank.findAll({
                    where: { id: job.assigned.codingProblems },
                    attributes: ["id", "title"],
                    include: [
                        {
                            model: Job,
                            where: { id: job.JobId },
                            attributes: ["id"],
                            through: { attributes: ["deadline", "duration"] }
                        }
                    ]
                });
                everyCodingProblem = JSON.parse(
                    JSON.stringify(everyCodingProblem)
                );
                // console.log(everyCodingProblem);
                const jobAssessments = {
                    jobId: jobData.id,
                    jobTitle: jobData.title,
                    description: jobData.description,
                    company: jobData.Recruiter.company,
                    avatar: jobData.Recruiter.avatar,
                    ...(everyMCQ.length && {
                        MCQ: everyMCQ.map(({ id, title, Jobs }) => ({
                            MCQId: id,
                            title,
                            expiryDate: Jobs[0].JobMCQ.expiryDate,
                            duration: Jobs[0].JobMCQ.duration
                        }))
                    }),
                    ...(everyTask.length && {
                        task: everyTask.map(({ id, title, Jobs }) => ({
                            taskId: id,
                            title,
                            deadline: Jobs[0].ActiveTask.deadline
                        }))
                    }),
                    ...(everyCodingProblem.length && {
                        codingProblem: everyCodingProblem.map(
                            ({ id, title, Jobs }) => ({
                                codingProblemId: id,
                                title,
                                deadline: Jobs[0].ActiveCodingProblem.deadline,
                                duration: Jobs[0].ActiveCodingProblem.duration
                            })
                        )
                    })
                };
                return jobAssessments;
            })
        );
        // console.log(everyMCQ[0].JobMCQs);
        res.status(200).send(assessments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
