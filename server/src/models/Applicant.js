const Sequelize = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const Applicant = db.define(
    "Applicant",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        major: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        yearsOfExperience: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        level: {
            type: Sequelize.STRING,
            allowNull: true
        },
        qualifications: {
            type: Sequelize.JSON,
            allowNull: true
        },
        tokens: {
            type: Sequelize.JSON
        }
    },
    {
        hooks: {
            beforeCreate: async (record) => {
                const user = this;
                if (record.changed("password")) {
                    record.password = await bcrypt.hash(record.password, 8);
                }
            }
        }
    }
);

Applicant.prototype.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this.id.toString() }, "123456");
    let tokens = [];
    if (this.tokens !== undefined) {
        tokens = JSON.parse(this.tokens);
    }
    tokens = tokens.concat({ token });
    this.tokens = JSON.stringify(tokens);
    await this.save();

    return token;
};

// Getting public data of the applicant
Applicant.prototype.getPublicApplicantData = function () {
    const user = this;
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        major: user.major,
        level: user.level,
        yearsOfExperience: user.yearsOfExperience,
        qualifications: user.qualifications
    };
};

// Updating public data of the applicant
Applicant.prototype.updatePublicApplicantData = async function (newUser) {
    //this.email = newUser.email
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.major = newUser.major;
    this.yearsOfExperience = newUser.yearsOfExperience;
    this.qualifications = newUser.qualifications;
    this.level = newUser.level;
    await this.save();
    return {
        level: this.level,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        major: this.major,
        yearsOfExperience: this.yearsOfExperience,
        qualifications: this.qualifications
    };
};

// Validate Applicant by it's email and password
Applicant.findByCredentials = async (email, password) => {
    const applicant = await Applicant.findOne({
        attributes: ["id", "firstName", "lastName", "password"],
        where: { email }
    });
    if (!applicant) {
        return undefined;
    }
    const validLogin = await bcrypt.compare(password, applicant.password);
    if (!validLogin) {
        return undefined;
    }
    return applicant;
};

module.exports = Applicant;
