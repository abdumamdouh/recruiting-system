const Sequelize = require("sequelize");
const db = require("../db/db");

const Question = db.define("Question", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    choices: {
        type: Sequelize.JSON,
        allowNull: false,
        unique: false
    }
});

module.exports = Question;
