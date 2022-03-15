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
        const assessments = await Promise.all(
            data.map(async (job) => {
                let everyMCQ = await MCQ.findAll({
                    where: { id: job.assigned.MCQs },
                    attributes: ["id", "category"],
                    include: [
                        {
                            model: Job,
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
                });
                everyMCQ = JSON.parse(JSON.stringify(everyMCQ));
                // console.log(everyMCQ[0].Jobs);
                const jobAssessments = {
                    jobId: everyMCQ[0].Jobs[0].id,
                    title: everyMCQ[0].Jobs[0].title,
                    description: everyMCQ[0].Jobs[0].description,
                    company: everyMCQ[0].Jobs[0].Recruiter.company,
                    avatar: everyMCQ[0].Jobs[0].Recruiter.avatar,
                    MCQ: everyMCQ.map(({ id, category, Jobs }) => ({
                        MCQId: id,
                        category,
                        expiryDate: Jobs[0].JobMCQ.expiryDate,
                        duration: Jobs[0].JobMCQ.duration
                    }))
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
