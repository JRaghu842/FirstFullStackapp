let mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose.connect(process.env.mongoURl);

module.exports = {
  connection,
};

// authclass
