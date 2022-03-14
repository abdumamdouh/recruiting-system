const express = require("express");
const _ = require("lodash");
const Sequelize = require("sequelize");
const Op = require("Sequelize").Op;
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const Requirment = require("../../models/Requirment");
const ApplyFor = require("../../models/ApplyFor");
const MCQ = require("../../models/MCQ");
const Question = require("../../models/Question");
const MCQStat = require("../../models/MCQStat");
const JobMCQ = require("../../models/JobMCQ");
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
        const { jobId, topic, expiryDate, duration, private } = req.body;
        const recruiterId = req.recruiter.id;
        // console.log(expiryDate, duration);
        const mcq = await MCQ.create({ topic, private, recruiterId });
        await mcq.addJob(jobId, { through: { expiryDate, duration } });
        let questions = req.body.questions.map(
            ({ options: choices, ...rest }) => ({
                choices,
                ...rest,
                MCQId: mcq.id
            })
        );
        await Question.bulkCreate(questions);
        // await mcq.addQuestion(questions);
        res.status(201).send("The file is uploaded successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Pick an availale MCQ exam to the job
router.post("/pickMCQ", recruiterAuth, async (req, res) => {
    try {
        const { jobId, MCQId, expiryDate, duration } = req.body;
        const mcq = await MCQ.findByPk(MCQId);

        await mcq.addJob(jobId, { through: { expiryDate, duration } });

        res.status(201).send("The MCQ is added successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all public mcq questions
router.get("/getAllMCQs/:pageNumber", recruiterAuth, async (req, res) => {
    try {
        const pageNumber = req.params.pageNumber;
        console.log(pageNumber);
        const results = await MCQ.findAndCountAll({
            include: {
                model: Question,
                as: "questions",
                attributes: ["id", "question", "choices", "answer"]
            },
            attributes: ["id", "topic", "recruiterId"],
            offset: (pageNumber - 1) * 4,
            limit: 4,
            where: {
                [Op.or]: [
                    {
                        private: {
                            [Op.eq]: false
                        }
                    },
                    {
                        recruiterId: {
                            [Op.eq]: req.recruiter.id
                        }
                    }
                ]
            }
        });

        const count = await db.query("SELECT COUNT(*) FROM mcqs");
        res.send({
            MCQs: results.rows,
            Count: count[0][0]["COUNT(*)"] // returning count of the exams for pagination
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get shuffled mcq questions by JobId
router.get("/getMCQ/:id", applicantAuth, async (req, res) => {
    try {
        // const tookExam = await MCQStat.findOne({
        //     where: {
        //         MCQId,
        //         applicantId,
        //         jobId
        //     }
        // });
        // if (tookExam) {
        //     throw new Error("You took exam already.");
        // }
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
        const MCQId = req.params.id;
        const applicantId = req.applicant.id;
        // const jobId = req.body;
        let data = await MCQ.findByPk(MCQId, {
            include: [
                {
                    model: Question,
                    as: "questions",
                    attributes: ["id", "answer"]
                },
                {
                    model: Job,
                    attributes: ["id"],
                    through: { attributes: [] }
                }
            ],
            attributes: []
        });
        data = JSON.parse(JSON.stringify(data));
        let { assigned } = await ApplyFor.findOne({
            where: {
                ApplicantId: applicantId,
                JobId: data.Jobs[0].id
            },
            attributes: ["assigned"],
            raw: true
        });
        assigned = JSON.parse(assigned);
        assigned.MCQs = _.without(assigned.MCQs, Number(MCQId));
        // console.log(assigned);
        assigned = JSON.stringify(assigned);
        await ApplyFor.update(
            { assigned },
            {
                where: { ApplicantId: applicantId, JobId: data.Jobs[0].id }
            }
        );
        const answers = data.questions.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.id]: cur.answer
            }),
            {}
        );
        // console.log(answers);
        let score = Object.keys(req.body.McqAnswers).reduce(
            (mark, key) =>
                req.body.McqAnswers[key] === answers[key] ? ++mark : mark,
            0
        );
        score = Number(
            ((score / Object.keys(answers).length) * 100).toFixed(2)
        );
        await MCQStat.create({
            MCQId,
            applicantId,
            jobId: data.Jobs[0].id,
            score
        });
        res.status(202).send(`${score}%`);
    } catch (error) {
        error.message === "Validation error"
            ? res.status(406).send("You have already submitted it.")
            : res.status(400).send(error.message);
    }
});

module.exports = router;
