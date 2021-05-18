const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connected Database
connectDB();

//bringing all routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to home page" });
});

//server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  console.log(`port listen on http://localhost:${PORT}`);
});
