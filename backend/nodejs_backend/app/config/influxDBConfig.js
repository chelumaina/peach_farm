const Influx = require('influx');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

require("dotenv").config();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// const influx = new Influx.InfluxDB({
//     database: process.env.INFLUX_DB_NAME,//'peach_farm', 
//     host: process.env.INFLUX_DB_HOST,//'localhost', 
//     port:process.env.INFLUX_DB_HOST,//'8086'
//   });
  const influx = new Influx.InfluxDB('http://admin:admin@localhost:8086/peach_farm')


  influx.getDatabaseNames().then((names) => {
    if (!names.includes(process.env.INFLUX_DB_NAME)) {
      return influx.createDatabase(process.env.INFLUX_DB_NAME);
    }
  })
  .then(() => {
    // http.createServer(app).listen(process.env.INFLUX_DB_PORT, function () {
    //   console.log(" influxDBConfig Listening on port 3000");
    // });
  })
  .catch((err) => {
    console.error(`Error creating Influx database influxDBConfig!`+err.stack);
  });
 
  