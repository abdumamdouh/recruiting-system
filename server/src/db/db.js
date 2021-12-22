const Sequelize = require('sequelize')

const sequelize = new Sequelize('GP-db','root','root',{
    dialect: 'mysql',
    host:'localhost'
 });

 module.exoprts = sequelize ; 