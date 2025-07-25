var express = require('express')
var path = require('path')
var createError = require('http-errors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const { decodeToken } = require('./middlewares')

const { authentication, products, categories, tags, deliveryAddresses, carts, orders, invoices } = require('./app/routers')

var app = express()

const allowedOrigins = ['http://localhost:3000', 'https://foodstore-ablahum.vercel.app']

app.use(cookieParser())
app.use(logger('dev'))
// app.use(cors())
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(decodeToken())

app.use('/auth', authentication)
app.use('/api', products)
app.use('/api', categories)
app.use('/api', tags)
app.use('/api', deliveryAddresses)
app.use('/api', carts)
app.use('/api', orders)
app.use('/api', invoices)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
})

module.exports = app
