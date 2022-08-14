const mongoose = require("mongoose");
// const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");

// mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
mongoose.connect("mongodb+srv://ablahum:nasigule@mycluster.gmgwy.mongodb.net/foodstore?retryWrites=true&w=majority");
const db = mongoose.connection;

module.exports = db;
