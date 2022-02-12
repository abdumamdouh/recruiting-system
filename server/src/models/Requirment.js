const Sequelize = require('sequelize')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/db')


const Requirment  = db.define('Requirment',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement:true ,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false ,
        unique: false
    },
    weight:{
        type: Sequelize.INTEGER ,
        allowNull: false
    }
});

module.exports = Requirment ;