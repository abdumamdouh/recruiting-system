const Sequelize = require("sequelize");
const db = require("../db/db");
const CodingProblemBank = require("./CodingProblemBank");
const Job = require("./Job");

const ActiveCodingProblem = db.define(
    "ActiveCodingProblem",
    {
        codingProblemId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
            // references: {
            //     model: 'CodingProblemBanks',
            //     key: 'id'
            // },
        },
        jobId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
            // references: {
            //     model: 'Jobs',
            //     key: 'id'
            // },
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: true
            // unique: "actions_unique"
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        uniqueKeys: {
            actions_unique: {
                fields: ["codingProblemId", "jobId", "deadline"]
            }
        }
    }
);

// M->N relation between Job and task
Job.belongsToMany(CodingProblemBank, {
    foreignKey: "jobId",
    otherKey: "codingProblemId",
    through: ActiveCodingProblem,
    uniqueKeys: "actions_unique"
});
CodingProblemBank.belongsToMany(Job, {
    through: ActiveCodingProblem,
    foreignKey: "codingProblemId",
    otherKey: "jobId",
    uniqueKeys: "actions_unique"
});

module.exports = ActiveCodingProblem;
