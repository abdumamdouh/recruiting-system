const Sequelize = require('sequelize')
const db = require('../db/db')

const Recruiter = db.define('Recruiter',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement:true ,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false ,
        unique: true 
    },
    userName:{
        type: Sequelize.STRING,
        allowNull: false ,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    position:{
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,

    },
    tokens: {
        type: Sequelize.JSON
    }
});


module.exports = Recruiter ;