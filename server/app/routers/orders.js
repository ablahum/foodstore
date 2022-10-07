const router = require('express').Router()

const { police_check } = require('../../middlewares')
const { getAll, createOne } = require('../controllers/OrderControllers')

router.get('/orders', police_check('view', 'Order'), getAll)
router.post('/orders', police_check('create', 'Order'), createOne)

module.exports = router
