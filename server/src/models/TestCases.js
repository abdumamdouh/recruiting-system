const Sequelize = require("sequelize");
const db = require("../db/db");
const CodingProblemBank = require("./CodingProblemBank");

const TestCases = db.define("TestCases", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // codingProblemId:{
    //     type:Sequelize.INTEGER,
    //     allowNull:false,
    //     references: {
    //         model: 'CodingProblemBanks',
    //         key: 'id'
    //     },
    // },
    inputs: {
        type: Sequelize.JSON,
        allowNull: false
    },
    outputs: {
        type: Sequelize.JSON,
        allowNull: false
    }
});

module.exports = TestCases;
