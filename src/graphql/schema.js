// /src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
    description: String
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    task(id: ID!): Task
  }

  type Mutation {
    createTask(name: String!, description: String): Task!
    updateTask(id: ID!, name: String, description: String, status: String): Task!
  }
`;

module.exports = typeDefs;
