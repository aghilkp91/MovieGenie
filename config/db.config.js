/**
 * Created by Christos Aghil
 * Project : MovieGenie
 * Filename : db.config.js
 * Date: 07/05/2020
 **/
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "pass",
  DB: "moviegenie",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
