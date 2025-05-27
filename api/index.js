const app = require('../server/app')
const serverless = require('serverless-http')
const connectDB = require('../server/db')

let handler

module.exports = async (event, context) => {
  await connectDB()

  if (!handler) {
    handler = serverless(app)
  }

  return handler(event, context)
}
