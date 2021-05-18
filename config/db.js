const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

const connectDB = () => {
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongodb connected"))
    .catch((err) => {
      console.log("something went wrong ", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
