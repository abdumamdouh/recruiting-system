const Sequelize = require("sequelize");
const db = require("../db/db");

const MCQQuestion = db.define("MCQQuestion", {}, { freezeTableName: true });

module.exports = MCQQuestion;
