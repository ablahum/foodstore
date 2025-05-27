const app = require('../server/app')
const serverless = require('serverless-http')

module.exports = serverless(app) // ← Ini yang diharapkan Vercel
