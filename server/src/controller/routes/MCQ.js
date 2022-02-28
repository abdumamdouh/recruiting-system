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

// get shuffled mcq questions by JobId
router.get("/getMCQ/:id", applicantAuth, async (req, res) => {
    try {
        let mcq = await MCQ.findByPk(req.params.id, {
            include: {
                model: Question,
                as: "questions",
                attributes: ["id", "question", "choices"],
                through: { attributes: [] }
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
        let { questions } = await MCQ.findByPk(req.params.id, {
            include: {
                model: Question,
                as: "questions",
                attributes: ["id", "answer"],
                through: { attributes: [] }
            },
            attributes: []
        });
        questions = JSON.parse(JSON.stringify(questions));
        const modifiedQuestions = questions.map((question) => ({
            [Object.values(question)[0]]: Object.values(question)[1]
        }));
        // console.log(modifiedQuestions);
        let result = 0;
        // console.log(req.body.answers);
        for (let answer of req.body.answers) {
            if (
                modifiedQuestions[Object.keys(answer)[0]] ===
                req.body.answers[Object.keys(answer)[0]]
            ) {
                result++;
            }
        }
        res.status(202).send(result.toString());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
