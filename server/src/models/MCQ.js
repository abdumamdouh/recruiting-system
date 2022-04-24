const Sequelize = require("sequelize");
const db = require("../db/db");

const MCQ = db.define("MCQ", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false
    }
    // recruiterId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     unique: false
    // }
});

module.exports = MCQ;
