const Sequelize = require('sequelize')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/db')
const Requirment = require('./Requirment')
const ApplyFor = require('./ApplyFor')

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
    employment_type:{
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
    }
});

// return job main informaton and its requirments

Job.prototype.getJobData = async function () {
    const job = this 
    const jobData =  {
        description: job.description ,
        workPlaceType: job.workPlaceType ,
        employment_type: job.employment_type ,
        title: job.title ,
        yearsOfExperience: job.yearsOfExperience,
        careerLevel: job.careerLevel ,
    }
    const requirments = await Requirment.findAll({
        attributes: {
            exclude: ['id', 'weight']
        },
        where: {
            JobId : job.id 
        }
    })

    jobData.requirments = requirments

    return jobData

}

Job.prototype.getJobStats = async function () {
    const job = this 


    applicants_applied = await ApplyFor.findAll({
        where: {
            JobId: job.id
        }
    })
    return applicants_applied
}

module.exports = Job ;