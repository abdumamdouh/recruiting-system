const Sequelize = require("sequelize");
const db = require("../db/db");
const MCQ = require("./MCQ");
const Question = require("./Question");

const MCQQuestion = db.define("MCQQuestion", {}, { freezeTableName: true });

// relation between MCQ nad question ( M-->N )
MCQ.belongsToMany(Question, { as: "questions", through: MCQQuestion });
Question.belongsToMany(MCQ, { as: "questions", through: MCQQuestion });

module.exports = MCQQuestion;
