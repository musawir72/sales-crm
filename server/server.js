const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 5000;
const db = require("./database/db");
var cors = require("cors");

app.use(express.json({ extended: false }));
app.use(cors());
var ip = require("ip");

app.use("/api/user", require("./routes/user"));
app.use("/api/job", require("./routes/job"));
app.use("/api/auth", require("./routes/auth"));
app.listen(port, ip.address(), () => {
  console.log("Server is up");
  console.log(ip.address());
});
