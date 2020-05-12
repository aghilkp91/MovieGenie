/**
 * Created by Aghil
 * Project : MovieGenie
 * Filename : Sequelize.js
 * Date: 07/05/2020
 * Time: 23:33
 **/
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
  const model = database.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.databaseConf = database;
// function to drop existing tables and re-sync database
db.dropRestApiTable = () => {
  db.databaseConf.sync({ force: true }).then(() => {
    console.log("restTutorial table just dropped and db re-synced.");
  });
};
//db.posts = require("./movie")(database, Sequelize);
db.users = require("./user")(database, Sequelize);
db.movies = require("./movie")(database, Sequelize);

module.exports = db;
