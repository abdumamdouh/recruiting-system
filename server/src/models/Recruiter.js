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
        allowNull: false 
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
            if ( record.changed('password')) {
                record.password = await bcrypt.hash(record.password, 8)
            }
        }
    }
});

// generating authentication token
Recruiter.prototype.generateAuthToken = async function () {
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
 
// Getting public data of the recruiter
Recruiter.prototype.getPublicRecruiterData = function () {
    const user = this 
    return {
        email: user.email ,
        firstName: user.firstName ,
        lastName: user.lastName ,
        company: user.company ,
        position: user.position 
    }
}

// Updating public data of the recruiter
Recruiter.prototype.updatePublicRecruiterData = function ( newUser ) {
    const user = this 
    //user.email = newUser.email
    user.firstName = newUser.firstName
    user.lastName = newUser.lastName
    user.company = newUser.company
    user.position = newUser.position
    user.save    
}

// Validate Recruiter by it's email and password
Recruiter.findByCredentials = async (email,password) => {
    const recruiter = await Recruiter.findOne({ where: { email } })
    if (!recruiter){
        return undefined
    }
    const validLogin = await bcrypt.compare(password,recruiter.password)  
    if (!validLogin){
       return undefined
    } 
    return recruiter
}

module.exports = Recruiter ;