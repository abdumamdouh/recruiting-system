const express = require("express");
const _ = require("lodash");
// const fs = require("fs");
// const { parse } = require("csv-parse");
const csv = require("csvtojson");
const Sequelize = require("sequelize");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const Requirment = require("../../models/Requirment");
const ApplyFor = require("../../models/ApplyFor");
const db = require("../../db/db");

// requiring applicant and recruiter authentication
const recruiterAuth = require("../middleware/recruiterAuth");
const applicantAuth = require("../middleware/applicantAuth");
const RecOrApp = require("../middleware/RecOrApp");
const { where } = require("sequelize");
const { object } = require("joi");

const router = new express.Router();

// Add MCQ exam via csv file
router.post("/uploadMCQ", recruiterAuth, async (req, res) => {
    try {
        const headers = [...Array(5).keys()];
        headers.forEach((index) => {
            headers[index] = index === 0 ? "question" : `choices.${index}`;
        });
        // console.log(headers);
        const data = await csv({
            noheader: true,
            headers: [
                "question",
                "choices.0",
                "choices.1",
                "choices.2",
                "choices.3"
            ],
            trim: true
        }).fromFile("./src/controller/routes/question.csv");
        res.status(200).send(data);
    } catch (error) {
        res.status(503).send(error.message);
    }
});

module.exports = router;
