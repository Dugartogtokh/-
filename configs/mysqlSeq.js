const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('task_management_local', 'root', 'tidyhunter1', {
  host: 'localhost',
  dialect: 'mysql'
});

const Task = sequelize.define('task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('new', 'active', 'completed', 'cancelled'),
    defaultValue: 'new'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

(async () => {
  await Task.sync({ force: true }); // This will create the table if it doesn't exist
  console.log("Task table created!");
})();

module.exports = Task;
