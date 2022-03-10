const Sequelize = require('sequelize')
const db = require('../db/db')

const ActiveTask = db.define('ActiveTask',{
    taskId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        refernces:{
            model: 'Tasks', 
            key: 'id'
        }
    },
    jobId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        refernces:{
            model: 'Jobs', 
            key: 'id'
        } 
    },
    deadline:{
        type: Sequelize.DATE ,
        allowNull:false
    }
});


module.exports = ActiveTask ;