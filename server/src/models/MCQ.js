const Sequelize = require("sequelize");
const db = require("../db/db");

const MCQ = db.define("MCQ", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    topic: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = MCQ;
