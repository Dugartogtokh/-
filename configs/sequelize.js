const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('task_management_local', 'root', 'tidyhunter1', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;