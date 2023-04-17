const mongoose = require('mongoose');

// Connect to the local MongoDB database
mongoose.connect('mongodb://localhost:3001/userThoughtDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Store the connection object in a variable
const db = mongoose.connection;

// Export the connection object
module.exports = db;
