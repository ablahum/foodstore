const authentication = require('./authentication');
const products = require('./products');
const categories = require('./categories');
const tags = require('./tags');
const deliveryAddresses = require('./deliveryAddresses');
const carts = require('./carts');
const orders = require('./orders');
const invoices = require('./invoices');

module.exports = {
  authentication,
  products,
  categories,
  tags,
  deliveryAddresses,
  carts,
  orders,
  invoices,
};
