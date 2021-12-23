const Sequelize = require('sequelize')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
}, {
    
    hooks: {
        beforeCreate : async (record) => {
            const user = this
            if ( record.changed('password')) {
                record.password = await bcrypt.hash(record.password, 8)
            } 
        }
    }
});


Applicant.prototype.generateAuthToken = async function () {

    const token = jwt.sign({ _id: this.id.toString() },'123456')
    let tokens = []
    if( this.tokens !== undefined ) {
        tokens = JSON.parse(this.tokens)
    }
    tokens = tokens.concat({token})
    this.tokens = JSON.stringify(tokens)
    await this.save()

    return token
}

// Validate Applicant by it's email and password
Applicant.findByCredentials = async (email,password) => {

    const applicant = await Applicant.findOne({ email })
    if (!applicant){
        return undefined
    }
    const validLogin = await bcrypt.compare(password,applicant.password)  
    if (!validLogin){
        return undefined
    } 
    return applicant
}

module.exports = Applicant ;