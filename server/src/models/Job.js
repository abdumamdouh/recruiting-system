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
    place:{
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
        employmentType: job.employmentType ,
        title: job.title ,
        yearsOfExperience: job.yearsOfExperience,
        careerLevel: job.careerLevel ,
    }
    const requirments = await Requirment.findAll({
        attributes: ['name', 'weight'],
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

Job.prototype.addRequirments = async function(requirments) {
    await requirments.forEach( async (requirment) => {
        const requirmentName = Object.keys(requirment)[0]
        const requirmentWeight = Object.values(requirment)[0]
        await Requirment.create({
            name: requirmentName,
            weight: requirmentWeight,
            JobId: this.id
        })
    });
}

module.exports = Job ;