const router = require('express').Router()

const { getOne } = require('../controllers/InvoiceControllers')

router.get('/invoices/:order_id', getOne)

module.exports = router
