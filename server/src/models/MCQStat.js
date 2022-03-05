const Sequelize = require("sequelize");
const db = require("../db/db");

const MCQStat = db.define(
    "MCQStat",
    {
        score: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        applicantId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "Applicants",
                key: "id"
            },
            primaryKey: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        jobId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "Jobs",
                key: "id"
            },
            primaryKey: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        MCQId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "MCQs",
                key: "id"
            },
            primaryKey: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    }
    // {
    //     indexes: [
    //         {
    //             name: "unique_index",
    //             unique: true,
    //             fields: ["applicantId", "jobId", "MCQId"]
    //         }
    //     ]
    // }
);

module.exports = MCQStat;
