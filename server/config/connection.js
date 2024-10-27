require('dotenv').config({ path: '../server./.env' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

module.exports = mongoose.connection;
