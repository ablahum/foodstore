const mongoose = require('mongoose');
const { dbHost, dbPass, dbName } = require('../config');

mongoose.connect(`mongodb+srv://ablahum:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`);

const db = mongoose.connection;

module.exports = db;
