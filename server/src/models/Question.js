const Sequelize = require("sequelize");
const validator = require("validator");
const db = require("../db/db");

const Question = db.define(
    "Question",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        topic: {
            type: Sequelize.STRING,
            // allowNull: false,
            unique: false
        },
        subtopic: {
            type: Sequelize.STRING,
            // allowNull: false
            unique: false
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
        },
        difficulty: {
            type: Sequelize.ENUM("Easy", "Medium", "Hard"),
            // allowNull: false,
            unique: false,
            validate: {
                isIn: {
                    args: [["Easy", "Medium", "Hard"]],
                    msg: "Invalid difficulty input."
                }
            }
        }
    }
    // {
    //     hooks: {
    //         beforeCreate(question) {
    //             if (!["Easy", "Medium", "Hard"].includes(question.difficulty)) {
    //                 throw new Error("Invalid difficulty input.");
    //             }
    //         },
    //         beforeBulkCreate(question) {
    //             if (!["Easy", "Medium", "Hard"].includes(question.difficulty)) {
    //                 throw new Error("Invalid difficulty input.");
    //             }
    //         }
    //     }
    // }
);

module.exports = Question;
