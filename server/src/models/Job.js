const Sequelize = require('sequelize')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/db')


const Job = db.define('Job',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement:true ,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false ,
        unique: false
    },
    workPlaceType:{
        type: Sequelize.STRING ,
        allowNull: false
    },
    employmentType:{
        type: Sequelize.STRING ,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    yearsOfExperience: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    careerLevel:{
        type: Sequelize.STRING ,
        allowNull: false
    },
    company:{
        type: Sequelize.STRING ,
        allowNull: false
    },
    place:{
        type: Sequelize.STRING ,
        allowNull: false
    }
});


module.exports = Job ;