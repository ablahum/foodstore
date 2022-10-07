const { police_check } = require('../../middlewares')
const { getAll, createOne, updateOne, deleteOne } = require('../controllers/DeliveryAddressControllers')

const router = require('express').Router()

router.get('/delivery-addresses', police_check('view', 'DeliveryAddress'), getAll)
router.post('/delivery-addresses', police_check('create', 'DeliveryAddress'), createOne)
router.put('/delivery-addresses/:id', updateOne)
router.delete('/delivery-addresses/:id', deleteOne)

module.exports = router
