const Sequelize = require('sequelize')
const db = require('../db/db')


const CodingProblemBank = db.define('CodingProblemBank',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    timeConstraint:{
        type:Sequelize.INTEGER,
    },
    memoryConstraint:{
        type:Sequelize.INTEGER,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
});




module.exports = CodingProblemBank