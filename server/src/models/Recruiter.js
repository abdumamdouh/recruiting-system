const Sequelize = require('sequelize')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/db')

const Recruiter = db.define('Recruiter',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement:true ,
        allowNull: false
    },
    firstName:{
        type: Sequelize.STRING ,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false ,
        unique: true 
    },
    userName:{
        type: Sequelize.STRING,
        allowNull: false ,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    position:{
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,

    },
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


Recruiter.prototype.generateAuthToken = async function () {

    const token = jwt.sign({ _id: this.id.toString() },'123456')
    let tokens = []
    if( this.tokens !== undefined )
    {
        tokens = JSON.parse(this.tokens)
    }

    tokens = tokens.concat({token})

    this.tokens = tokens

    await this.save()

    return token
}
module.exports = Recruiter ;