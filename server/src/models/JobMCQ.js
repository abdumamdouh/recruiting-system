const Sequelize = require("sequelize");
const db = require("../db/db");
const Job = require("./Job");
const MCQ = require("./MCQ");

const JobMCQ = db.define("JobMCQ", {}, { freezeTableName: true });

// relation between job and MCQ ( M-->N )
Job.belongsToMany(MCQ, { through: JobMCQ });
MCQ.belongsToMany(Job, { through: JobMCQ });

module.exports = JobMCQ;
