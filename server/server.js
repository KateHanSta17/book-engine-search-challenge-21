require('dotenv').config({ path: './server/.env' });

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
  // Serve the static files from the Vite build (usually in 'dist')
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle any other routes with the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.start().then(() => {
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
