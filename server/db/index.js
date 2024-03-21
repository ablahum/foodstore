const mongoose = require('mongoose')
const { dbHost, dbPass, dbName, dbPort, dbUser, dbReplica } = require('../config')

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?replicaSet=${dbReplica}&ssl=true&authSource=admin`)

const db = mongoose.connection

module.exports = db
