// Import necessary modules and files
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set the port number
const PORT = 3001;

// Create an instance of the express application
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
