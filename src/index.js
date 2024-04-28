const path = require('path');
const db = require('./db');
const { createConfig } = require('./config/config');
const logger = require('./config/logger');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const express = require('express');
const mysql = require('mysql2');
const Task = require("./models/mysqltask");
const sequelize = require("../configs/sequelize");

async function run() {
  const configPath = path.join(__dirname, '../configs/.env');
  const config = createConfig(configPath);
  
  await db.init(config);

  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start(); // Start the Apollo Server instance

  server.applyMiddleware({ app });

  const httpServer = app.listen(config.port, () => {
    console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`);
  });

  const exitHandler = () => {
    if (httpServer) {
      httpServer.close(() => {
        logger.info('HTTP server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error) => {
    logger.error('Unhandled error', { error });
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (httpServer) {
      httpServer.close();
    }
  });
}

run();
