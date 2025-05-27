const app = require('../server/app')
const serverless = require('serverless-http')

// const connectDB = require('../server/db')

// let handler

// module.exports = async (event, context) => {
//   await connectDB()

//   if (!handler) {
//     handler = serverless(app)
//   }

//   return handler(event, context)
// }

// module.exports = serverless(app)

let handler

module.exports.handler = async (event, context) => {
  await connectDB() // pastikan koneksi dibuka sebelum Express digunakan

  if (!handler) {
    handler = serverless(app)
  }

  return handler(event, context)
}
