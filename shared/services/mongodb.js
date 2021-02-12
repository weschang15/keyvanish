const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

exports.createConnection = function (options = {}) {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    ...options,
  });
};
