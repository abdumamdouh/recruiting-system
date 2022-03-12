const express = require("express");
const _ = require("lodash");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const MCQ = require("../../models/MCQ");
const JobMCQ = require("../../models/JobMCQ");
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
            console.log(job);
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
                // // get applicants(Names,IDs) applied for that job
                // const [results, metadata] = await db.query(
                //     "SELECT A.userName,A.id FROM ApplyFors AS AF INNER JOIN Applicants AS A ON AF.ApplicantId = A.id WHERE AF.JobId=?",
                //     {
                //         replacements: [job.id]
                //     }
                // );

                // let maxScore = 0;

                // job.Requirments.forEach((requirement) => {
                //     maxScore = maxScore + requirement.weight * 4;
                // });

                // // calculate the score of each applicant and append it to each applicant
                // for (let index = 0; index < results.length; index++) {
                //     const a = results[index];
                //     let aScore = 0;
                //     const applicantA = await Applicant.findOne({
                //         where: {
                //             id: a.id
                //         }
                //     });

                //     for (
                //         let index = 0;
                //         index < applicantA.qualifications.length;
                //         index++
                //     ) {
                //         const qualification = applicantA.qualifications[index];
                //         const requirmentObj = await job.Requirments.find(
                //             (req) => {
                //                 return req.name == Object.keys(qualification);
                //             }
                //         );

                //         if (requirmentObj) {
                //             aScore =
                //                 aScore +
                //                 requirmentObj.weight *
                //                     Object.values(qualification)[0];
                //         }
                //     }
                //     results[index].score = Math.ceil((aScore / maxScore) * 100);
                // }

                // // sort the applicants by the score
                // results.sort((a, b) => {
                //     return b.score - a.score;
                // });
                // console.log(results);
                job.dataValues.applicants = applicantScores(job);

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
        Requirment.destroy({ where: { JobId: job.id }, force: true });
        const requirements = req.body.stack.map((requirment) => ({
            name: Object.keys(requirment)[0],
            weight: Object.values(requirment)[0],
            JobId: job.id
        }));
        // console.log(requirements);
        await job.save();
        Requirment.bulkCreate(requirements);
        _.set(
            job.dataValues,
            "stack",
            requirements.map((requirement) => _.omit(requirement, ["JobId"]))
        );
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
                attributes: ["topic"]
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
            const applicants = await ApplyFor.findAll({
                // attributes: ["assigned"],
                where: {
                    jobId: jobId,
                    ApplicantId: {
                        [Op.in]: mcq.applicants
                    }
                }
            });

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

            res.send("MCQ Assigned");
        } else if (req.body.codingProblem) {
            const codingProblems = req.body.codingProblem;
        } else if (req.body.task) {
            const tasks = req.body.task;
        } else {
        }
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
