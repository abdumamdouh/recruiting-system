const Sequelize = require("sequelize");
const db = require("../db/db");

const CodingProblemBank = db.define("CodingProblemBank", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    recruiterId: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING(5000),
        allowNull: false
    },
    timeConstraint: {
        type: Sequelize.INTEGER
    },
    memoryConstraint: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = CodingProblemBank;
