const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
//Connected Database
connectDB();

//bringing all routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//init Middleware
app.get("/", (req, res) => {
  res.json({ message: "Welcome to home page" });
});

//server static assests in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  console.log(`port listen on http://localhost:${PORT}`);
});
