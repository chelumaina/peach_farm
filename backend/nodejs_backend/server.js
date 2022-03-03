// Bring in required Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();


// Bring in the route
const routes = require("./app/routes");



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.use("/api/peach-farm", routes);

// Define PORT
const PORT = process.env.PORT || 8091;

// Listen to the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});