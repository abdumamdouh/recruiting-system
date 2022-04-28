const Sequelize = require('sequelize')
const db = require('../db/db')
// const CodingProblemBank = require("./CodingProblemBank")
// const Job = require("./Job")


const ActiveCodingProblem = db.define('ActiveCodingProblem',{
    codingProblemId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references: {
            model: 'CodingProblemBanks', 
            key: 'id'
        },
    },
    jobId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references: {
            model: 'Jobs', 
            key: 'id'
        },
    },
    deadline:{
        type:Sequelize.DATE,
        allowNull:false
    },
    duration:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports = ActiveCodingProblem;