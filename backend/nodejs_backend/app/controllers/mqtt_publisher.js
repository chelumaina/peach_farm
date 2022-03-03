const mqtt = require("mqtt");
const Influx = require("influx");
require("dotenv").config();

var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../../data/iot_data.json");

// const influx = new Influx.InfluxDB({
//     database: process.env.INFLUX_DB_NAME,//'peach_farm',
//     host: process.env.INFLUX_DB_HOST,//'localhost',
//     port:process.env.INFLUX_DB_HOST,//'8086'
//   });

const influx = new Influx.InfluxDB(
  "http://admin:admin@localhost:8086/peach_farm"
);

const host = process.env.MQTT_BROKER_HOST; //"test.mosquitto.org"//
const port = process.env.MQTT_PORT;
1883; //process.env.MQTT_PORT
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
console.log(clientId);

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});

const topic = "/70cecfb3-a40e";

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
  console.log(`Subscribe to topic '${topic}'`);

  fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      let parseJSON = JSON.parse(data);
      for (let i = 0; i < parseJSON.length; i++) {
        const payload = parseJSON[i];
        console.log(parseJSON[i]);

        client.publish(topic, JSON.stringify(payload), { qos: 1, retain: true }, (PacketCallback, err) => {
            if (err) {
              console.log(err, "MQTT publish packet");
            }
          }
        );
      }
    } else {
      console.log(err);
    }
  });
});

client.on("message", (topic, payload) => {
  var payload = JSON.parse(payload);
  influx
    .writePoints(
      [
        {
          measurement: "TemperatureSensor",
          tags: {
            cold_room_id: payload.cold_room_id,
            humidity: payload.humidity,
            temperature: payload.temperature,
            temperature: payload.temperature,
            kws_energy: payload.kws_energy,
          },
          fields: {
            cold_room_id: payload.cold_room_id,
            humidity: payload.humidity,
            temperature: payload.temperature,
            kws_energy: payload.kws_energy,
          },
          timestamp: payload.timestamp*1000000,
        },
      ],
      {
        database: "peach_farm", 
      }
    )
    .catch((error) => {
      console.error(`Error saving data to InfluxDB! ${error.stack}`);
    });
  console.log("Received Message:", topic, payload.toString());
});
