const Sequelize = require('sequelize')
const db = require('../db/db')

const Applicant = db.define('Applicant',{
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
    firstName:{
        type: Sequelize.STRING ,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    major: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    userName:{
        type: Sequelize.STRING,
        allowNull: false ,
        unique: true
    } ,
    password:{
        type: Sequelize.STRING,
        allowNull: false 
    } ,
    yearsOfExperience: {
        type: Sequelize.INTEGER ,
        allowNull: false
    } ,
    level:{
        type: Sequelize.STRING ,
        allowNull : false
    } ,
    qualifications:{
        type: Sequelize.JSON,
        allowNull: false
    } ,
    tokens: {
        type: Sequelize.JSON
    }
});

module.exports = Applicant ;