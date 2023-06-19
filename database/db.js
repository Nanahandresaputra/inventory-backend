const mongoose = require("mongoose");
const config = require("../config/config");

// mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=${config.dbSource}`);\

mongoose.connect("mongodb+srv://test:test@cluster0.ft6f6ss.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

module.exports = db;
