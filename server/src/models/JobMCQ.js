const Sequelize = require("sequelize");
const db = require("../db/db");
const Job = require("./Job");
const MCQ = require("./MCQ");

const JobMCQ = db.define(
    "JobMCQ",
    {
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        duration: {
            type: Sequelize.INTEGER(3),
            allowNull: false
        }
    },
    { freezeTableName: true }
);

// relation between job and MCQ ( M-->N )
Job.belongsToMany(MCQ, { through: JobMCQ });
MCQ.belongsToMany(Job, { through: JobMCQ });
Job.hasMany(JobMCQ);
JobMCQ.belongsTo(Job);
MCQ.hasMany(JobMCQ);
JobMCQ.belongsTo(MCQ);

module.exports = JobMCQ;
