const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const prometheus = require('express-prom-bundle');
const docs = require('./routes/docs');
const health = require('./routes/health');
const v1 = require('./routes/v1');
const { errorHandler } = require('./middlewares/error');
const logger = require('./middlewares/logger');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next)=> {
    console.log("request:", `${req.method} ${req.protocol}://${req.hostname}:3001${req.originalUrl} `)
    next();
});
app.use(logger);
app.use(xss());
app.use(mongoSanitize());
app.use(compression());

// Docs and health routes
app.use('/docs', docs);
app.use('/health', health);

// V1 API routes
app.use('/v1', v1);

// GraphQL setup
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });

// Error handler
app.use(errorHandler);

module.exports = app;
