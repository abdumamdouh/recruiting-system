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
const MCQStat = require("../../models/MCQStat");
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
        const { jobId, topic, expiryDate, duration } = req.body;
        // console.log(expiryDate, duration);
        const mcq = await MCQ.create({ topic });
        await mcq.addJob(jobId, { through: { expiryDate, duration } });
        let questions = req.body.questions.map(
            ({ options: choices, ...rest }) => ({
                choices,
                ...rest,
                MCQId: mcq.id
            })
        );
        await Question.bulkCreate(questions);
        // console.log(questions);
        // await mcq.addQuestion(questions);
        res.status(201).send("The file is uploaded successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get shuffled mcq questions by JobId
router.get("/getMCQ/:id", applicantAuth, async (req, res) => {
    try {
        let mcq = await MCQ.findByPk(req.params.id, {
            include: {
                model: Question,
                as: "questions",
                attributes: ["id", "question", "choices"]
                // through: { attributes: [] }
            },
            attributes: ["id", "topic"]
        });
        mcq = JSON.parse(JSON.stringify(mcq));
        mcq.questions = _.shuffle(mcq.questions);
        // console.log(mcq.questions);
        mcq.questions.forEach((question) => {
            question.choices = _.shuffle(question.choices);
        });
        // console.log(mcq.questions);
        res.status(200).send(mcq);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// submit applicant answers by MCQId
router.post("/submit/:id", applicantAuth, async (req, res) => {
    try {
        const { MCQId, applicantId, jobId } = req.body;
        let { questions } = await MCQ.findByPk(req.params.id, {
            include: {
                model: Question,
                as: "questions",
                attributes: ["id", "answer"]
                // through: { attributes: [] }
            },
            attributes: []
        });
        questions = JSON.parse(JSON.stringify(questions));
        const answers = questions.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.id]: cur.answer
            }),
            {}
        );
        // console.log(answers);
        const score = Object.keys(req.body.McqAnswers).reduce(
            (mark, key) =>
                req.body.McqAnswers[key] === answers[key] ? ++mark : mark,
            0
        );
        await MCQStat.create({ MCQId, applicantId, jobId, score });
        res.status(202).send(score.toString());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
