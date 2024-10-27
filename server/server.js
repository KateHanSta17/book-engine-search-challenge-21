const dotenv = require('dotenv').config();
console.log(dotenv.error ? 'Error loading .env' : 'Loaded .env successfully');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection'); // Your MongoDB connection
const { typeDefs, resolvers } = require('./schemas'); // GraphQL schema and resolvers
const { authMiddleware } = require('./utils/auth'); // Middleware for authentication

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Start the Apollo Server
server.start().then(() => {
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
