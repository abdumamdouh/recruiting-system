const Sequelize = require('sequelize')
const db = require('../db/db')

const Task = db.define('Task',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement:true ,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING(5000),
        allowNull: false  
    },
    uploadFormat:{
        type: Sequelize.JSON ,
        defaultValue:"ZIP,RAR"
    }
});


module.exports = Task ;