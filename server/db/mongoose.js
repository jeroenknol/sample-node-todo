const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB,
  { useNewUrlParser: true }
);

module.exports = { mongoose };
