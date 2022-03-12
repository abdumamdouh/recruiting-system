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
            where: applicantId,
            attributes: ["assigned", "JobId"]
        });
        data.forEach((job) => {
            job.assigned = JSON.parse(job.assigned);
        });
        let everyMCQ = await MCQ.findAll({
            where: { id: data[0].assigned.MCQs },
            include: [
                { model: JobMCQ, attributes: ["expiryDate", "duration"] },
                {
                    model: Job,
                    attributes: []
                    // through: { attributes: ["duration", "expiryDate"] }
                }
            ],
            attributes: ["id", "topic"]
        });
        everyMCQ = JSON.parse(JSON.stringify(everyMCQ));
        everyMCQ.forEach(({ id, topic, JobMCQs }, index, arr) => {
            arr[index] = {
                id,
                topic,
                expiryDate: JobMCQs[0].expiryDate,
                duration: JobMCQs[0].duration
            };
        });
        // console.log(everyMCQ[0].JobMCQs);
        res.status(200).send({ MCQs: everyMCQ });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
