const Sequelize = require('sequelize')
const db = require('../db/db')
const Task = require('./Task')
const Job = require('./Job')

const TaskUploads = db.define('TaskUploads',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement:true ,
        allowNull: false
    },
    ApplicantId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"Applicants",
            key: "id"
        }
    },
    JobId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"Jobs",
            key: "id"
        }
    },
    TaskId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"Tasks",
            key: "id"
        }
    },
    uploadedTask:{
        type:Sequelize.BLOB('long'),
        allowNull:false
    }
});

// Job.belongsToMany(Task, { through: TaskUploads });
// Task.belongsToMany(Job, { through: TaskUploads });

module.exports = TaskUploads ;