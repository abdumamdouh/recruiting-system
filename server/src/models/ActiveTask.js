const Sequelize = require('sequelize')
const db = require('../db/db')
const Task = require('./Task')
const Job = require('./Job')


const ActiveTask = db.define('ActiveTask',{
    deadline:{
        type: Sequelize.DATE ,
        allowNull:false
    }
});

// M->N relation between Job and task
Job.belongsToMany(Task, { through: ActiveTask });
Task.belongsToMany(Job, { through: ActiveTask });

// db.query(`
// CREATE EVENT IF NOT EXISTS  delete_passed_tasks
// ON SCHEDULE EVERY 1 MINUTE
// STARTS CURRENT_TIMESTAMP 
// DO 
// DELETE FROM ActiveTasks AS AT WHERE now() > AT.deadline  ;`)

module.exports = ActiveTask ;