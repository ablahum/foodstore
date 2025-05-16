const mongoose = require('mongoose')
const { dbHost, dbUser, dbPass, dbName } = require('../config')

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`)

const db = mongoose.connection

module.exports = db
