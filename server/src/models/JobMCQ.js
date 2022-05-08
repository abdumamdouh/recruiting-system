const Sequelize = require("sequelize");
const db = require("../db/db");
const Job = require("./Job");
const MCQ = require("./MCQ");

const JobMCQ = db.define(
    "JobMCQ",
    {
        JobId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        MCQId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: true
        },
        duration: {
            type: Sequelize.INTEGER(3),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        uniqueKeys: {
            actions_unique: {
                fields: ["MCQId", "jobId", "expiryDate"]
            }
        }
    }
);

// relation between job and MCQ ( M-->N )
Job.belongsToMany(MCQ, { through: JobMCQ, uniqueKeys: "actions_unqiue" });
MCQ.belongsToMany(Job, { through: JobMCQ, uniqueKeys: "actions_unqiue" });
Job.hasMany(JobMCQ);
JobMCQ.belongsTo(Job);
MCQ.hasMany(JobMCQ);
JobMCQ.belongsTo(MCQ);

module.exports = JobMCQ;
