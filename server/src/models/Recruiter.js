const Sequelize = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const Recruiter = db.define(
    "Recruiter",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        position: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tokens: {
            type: Sequelize.JSON
        },
        avatar: {
            type: Sequelize.BLOB("long"),
            allowNull: true
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

// generating authentication token
Recruiter.prototype.generateAuthToken = async function () {
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

// Getting public data of the recruiter
Recruiter.prototype.getPublicRecruiterData = function () {
    const user = this;
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        position: user.position
    };
};

Recruiter.prototype.saveAvatar = async function (avatar) {
    this.avatar = avatar;
    await this.save();
};

// Updating public data of the recruiter
Recruiter.prototype.updatePublicRecruiterData = async function (newUser) {
    const user = this;
    //user.email = newUser.email
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.company = newUser.company;
    this.position = newUser.position;
    await this.save();
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company,
        position: this.position
    };
};

// Validate Recruiter by it's email and password
Recruiter.findByCredentials = async (email, password) => {
    const recruiter = await Recruiter.findOne({
        attributes: [
            "id",
            "firstName",
            "lastName",
            "password",
            "company",
            "avatar"
        ],
        where: { email }
    });
    if (!recruiter) {
        return undefined;
    }
    const validLogin = await bcrypt.compare(password, recruiter.password);
    if (!validLogin) {
        return undefined;
    }
    return recruiter;
};

module.exports = Recruiter;
