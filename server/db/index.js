const mongoose = require('mongoose')
const { dbHost, dbPass, dbName, dbPort, dbUser } = require('../config')

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}.baw8glc.mongodb.net/${dbName}?retryWrites=true&w=majority`)

const db = mongoose.connection

module.exports = db
