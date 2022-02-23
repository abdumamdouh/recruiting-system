const Sequelize = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const Job = require("../models/Job");

const Requirment = db.define("Requirment", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    // JobId: {
    //     type: "foreign key",
    //     references: {
    //         model: "job",
    //         key: "id"
    //     },
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE"
    // }
});

module.exports = Requirment;
