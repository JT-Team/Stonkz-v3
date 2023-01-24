// this is the mongo database setup

const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.DB_STRING;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Stonkz'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    hash: String,
    salt: String
});

const User = mongoose.model('User', UserSchema);

// Expose the connection
module.exports = User;