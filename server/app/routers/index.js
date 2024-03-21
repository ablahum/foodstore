const authentications = require('./authentications')
const products = require('../routers/products')
const categories = require('../routers/categories')
const tags = require('../routers/tags')
const deliveryAddresses = require('../routers/deliveryAddresses')
const carts = require('../routers/carts')
const orders = require('../routers/orders')
const invoices = require('../routers/invoices')

module.exports = {
  authentications,
  products,
  categories,
  tags,
  deliveryAddresses,
  carts,
  orders,
  invoices,
}
