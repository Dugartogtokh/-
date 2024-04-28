const logger = require('../config/logger');
const sequelize = require("../../configs/sequelize");

async function init() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    // Additional initialization logic can be added here if needed.
  } catch (err) {
    logger.error('Error in database connection:', err);
    setTimeout(init, 5000);
  }
}

function destroy() {
  // If there are any clean-up tasks needed, they can be added here.
  // For Sequelize, you may not need explicit clean-up.
}

// Set up event listeners for Sequelize connection events (if needed).
sequelize
  .sync() // This can be used to synchronize models with the database if necessary.
  .then(() => {
    console.log("Database synchronized.");
  })
  .catch((err) => {
    logger.error('Error synchronizing models with the database:', err);
  });

module.exports = {
  init,
  destroy,
};
