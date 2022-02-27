const express = require("express");
const _ = require("lodash");
const Sequelize = require("sequelize");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const Requirment = require("../../models/Requirment");
const ApplyFor = require("../../models/ApplyFor");
const MCQ = require("../../models/MCQ");
const Question = require("../../models/Question");
const db = require("../../db/db");

// requiring applicant and recruiter authentication
const recruiterAuth = require("../middleware/recruiterAuth");
const applicantAuth = require("../middleware/applicantAuth");
const RecOrApp = require("../middleware/RecOrApp");
const { where } = require("sequelize");
const { object } = require("joi");
const { includes } = require("lodash");

const router = new express.Router();

// Add MCQ exam via csv file
router.post("/uploadMCQ", recruiterAuth, async (req, res) => {
    try {
        const { jobId, topic } = req.body;
        let questions = req.body.questions.map(
            ({ options: choices, ...rest }) => ({ choices, ...rest })
        );
        const mcq = await MCQ.create({ topic });
        await mcq.addJob(jobId);
        questions = await Question.bulkCreate(questions);
        await mcq.addQuestion(questions);
        res.status(201).send("The file is uploaded successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/getMCQ", applicantAuth, async (req, res) => {
    try {
        const mcq = await MCQ.findByPk(req.body.jobId, {
            include: {
                model: Question,
                attributes: ["id", "question", "choices"],
                through: { attributes: [] }
            },
            attributes: ["id", "topic"]
        });
        res.status(200).send(mcq);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
