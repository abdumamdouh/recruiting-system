const Sequelize = require('sequelize')

const db = new Sequelize('gp-db','root','root',{
    dialect: 'mysql',
    host:'localhost'
});

// Uncomment the following sector to test the db connection

// const testConnection = async() => {
//      try {
//     await db.authenticate();
//     console.log('Connection has been established successfully.');
//     } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     }
// }
// testConnection()

module.exports = db ; 