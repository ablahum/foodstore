// const mongoose = require('mongoose')
// const { dbHost, dbUser, dbPass, dbName } = require('../config')

// mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`)

// const db = mongoose.connection

// module.exports = db

const mongoose = require('mongoose')
const { dbHost, dbUser, dbPass, dbName } = require('../config')

let isConnected = false

const connectDB = async () => {
  if (isConnected) return

  const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  isConnected = true
  console.log('MongoDB Connected')
}

module.exports = connectDB
