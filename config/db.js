const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    mongoose.set("useCreateIndex", true);
    console.log("mongodb connected");
  } catch (err) {
    console.log("something went wrong ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
