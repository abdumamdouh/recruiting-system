const Sequelize = require('sequelize')
const db = require('../db/db')


const CodingProblemStat = db.define(
    "CodingProblemStat",
    {

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
        codingProblemId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "CodingProblemBanks",
                key: "id"
            },
            primaryKey: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },

        results:{
            type:Sequelize.JSON,
            allowNull:false
        }
    }

);


module.exports = CodingProblemStat