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
    timeConstraints:{
        type:Sequelize.STRING,
    },
    memoryConstraints:{
        type:Sequelize.STRING,
    }
});




module.exports = CodingProblemBank