const Sequelize = require("sequelize");
const db = require("../db/db");

const JobMCQ = db.define("JobMCQ", {}, { freezeTableName: true });

module.exports = JobMCQ;
