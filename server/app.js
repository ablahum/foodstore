var express = require('express')
var path = require('path')
var createError = require('http-errors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const { decodeToken } = require('./middlewares')

// const auth = require('./app/auth/router')
// const products = require('./app/product/router')
// const categories = require('./app/category/router')
// const tags = require('./app/tag/router')
// const deliveryAddresses = require('./app/deliveryAddress/router')
// const carts = require('./app/cart/router')
// const orders = require('./app/order/router')
// const invoices = require('./app/invoice/router')

const auth = require('./app/routers/auths')
const products = require('./app/routers/products')
const categories = require('./app/routers/categories')
const tags = require('./app/routers/tags')
const deliveryAddresses = require('./app/routers/deliveryAddresses')
const carts = require('./app/routers/carts')
const orders = require('./app/routers/orders')
const invoices = require('./app/routers/invoices')

var app = express()

app.use(cookieParser())
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(decodeToken())

app.use('/auth', auth)
app.use('/api', products)
app.use('/api', categories)
app.use('/api', tags)
app.use('/api', deliveryAddresses)
app.use('/api', carts)
app.use('/api', orders)
app.use('/api', invoices)

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function (req, res, next) {
  next(createError(404))
})

// ERROR HANDLER
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
})

module.exports = app
