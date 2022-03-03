require("dotenv").config();
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
/*
Import mysql connection from the config file and 
connect to the database and store the same connection into a variable
*/

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    operatorAliases: 0,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*
pass the connections to the Peach Models for innitializations and export
*/
db.peach_farm = require("./peach_farm.model.js")(sequelize, Sequelize);
module.exports = db;
