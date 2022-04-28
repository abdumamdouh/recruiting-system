const Sequelize = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const Job = require("./Job");
const Applicant = require("./Applicant");

const ApplyFor = db.define("ApplyFor", {
    JobId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Jobs",
            key: "id"
        },
        primaryKey: true,
        onDelete: "cascade"
    },
    ApplicantId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Applicants",
            key: "id"
        },
        primaryKey: true,
        onDelete: "cascade"
    },
    assigned: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify({
            MCQs: [],
            tasks: [],
            codingProblems: []
        })
    }
});

module.exports = ApplyFor;
