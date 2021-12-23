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
            // console.log(user) check
            // console.log(record.dataValues)
            if ( record.changed('password')) {
                record.password = await bcrypt.hash(record.password, 8)
            }
            //next()   
        }
    }
});


Applicant.prototype.generateAuthToken = async function () {

    const token = jwt.sign({ _id: this.id.toString() },'123456')
    let tokens = [{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiaWF0IjoxNjQwMjEyODkzfQ.gMKpxoihTY3ecpVZ8nwJGd37Ue6v9NUMB9CKeV3cbvw'}]
    if( this.tokens !== undefined )
    {
        tokens = JSON.parse(this.tokens)
    }

    tokens = tokens.concat({token})

    this.tokens = tokens

    await this.save()

    return token
}
module.exports = Applicant ;