// /src/graphql/resolvers.js
const taskService = require('../services/task');

const resolvers = {
  Query: {
    task: (_, { id }) => taskService.getTaskById(id),
    // tasks: () => taskService.getAllTasks(),
  },
  Mutation: {
    createTask: (_, { name, description }) => taskService.createTask(name, description),
    updateTask: (_, args) => taskService.updateTaskById(args.id, args),
  },
};

module.exports = resolvers;
