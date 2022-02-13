const Sequelize = require('sequelize')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/db')

const Job = require('./Job')
const Applicant = require('./Applicant')


const ApplyFor = db.define('ApplyFor',{
    JobId: {
        type: Sequelize.INTEGER,
        references: {
            model: Job, 
            key: 'id'
        },
        primaryKey: true
    },
    ApplicantId: {
        type: Sequelize.INTEGER,
        references: {
            model: Applicant, 
            key: 'id'
        },
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = ApplyFor ;