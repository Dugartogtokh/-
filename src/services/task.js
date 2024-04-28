const logger = require('../config/logger');
const Task = require('../models/mysqltask');
const {
  AT_LEAST_ONE_UPDATE_REQUIRED_CODE,
  INVALID_STATUS_CODE,
  INVALID_STATUS_TRANSITION_CODE,
  TASK_NOT_FOUND_CODE,
  CONCURRENCY_ERROR_CODE
} = require('./errorCodes');

async function getTaskById(id) {
  try {
    const task = await Task.findByPk(id);
    return task;
  } catch (error) {
    logger.error('Error fetching task by ID', { error });
    throw error; // Re-throw the error for handling at a higher level
  }
}

async function createTask(name, description) {
  try {
    const result = await Task.create({ name, description });
    return result;
  } catch (error) {
    logger.error('Error creating task', { error });
    throw error;
  }
}

const availableUpdates = {
  new: ['active', 'cancelled'],
  active: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

async function updateTaskById(id, { name, description, status }) {
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error('Task not found');
    }

    // Update task properties if provided
    if (name !== undefined) {
      task.name = name;
    }
    if (description !== undefined) {
      task.description = description;
    }
    if (status !== undefined) {
      task.status = status;
    }

    // Save the updated task
    await task.save();

    return task; // Return the updated task
  } catch (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

module.exports = {
  getTaskById,
  createTask,
  updateTaskById,
};
