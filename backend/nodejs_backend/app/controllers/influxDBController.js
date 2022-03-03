//const influx =require('./../config/influxDBConfig.js');

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


  exports.getData =function (req, res) {
    const id = req.query.id;
    influx
      .query(`select * from TemperatureSensor`)
      .then((result) => { 
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  };

  //- latest cold room humidity;
  exports.getlatestHumidity =function (req, res) {
 
    console.log("  -    "+req);
    const id = req.query.id;
    influx
      .query(`SELECT last(humidity), time FROM TemperatureSensor where cold_room_id = 1`)
      .then((result) => { 
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  };

  //- latest cold room temperature;
  exports.getlatestTemparature =function (req, res) {
    const id = req.query.id;
    influx
      .query(`SELECT last(temperature) as measure, time FROM TemperatureSensor where cold_room_id = 1`)
      .then((result) => { 
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  };
  
    //- highest field temperature;
    exports.getMaxTemparature =function (req, res) {
      const id = req.query.id;
      influx
        .query(`SELECT max(temperature) as measure, time FROM TemperatureSensor where cold_room_id = 1`)
        .then((result) => { 
          res.json(result);
        })
        .catch((err) => {
          res.status(500).send(err.stack);
        });
    };
  
    //-average cold room temperature;
    exports.getAVGTemparature =function (req, res) {
      const id = req.query.id;
      influx
        .query(`SELECT MEAN(temperature) as measure, time FROM TemperatureSensor where cold_room_id =1`)
        .then((result) => { 
          res.json(result);
        })
        .catch((err) => {
          res.status(500).send(err.stack);
        });
    }; 
 

    //- total energy consumption; 
        exports.getTotalEnergy =function (req, res) {
          const id = req.query.id;
          influx
            .query(`SELECT MEAN(kws_energy) as measure, time FROM TemperatureSensor where cold_room_id = 1`)
            .then((result) => { 
              res.json(result);
            })
            .catch((err) => {
              res.status(500).send(err.stack);
            });
        }; 