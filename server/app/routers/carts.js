const router = require('express').Router()

const { police_check } = require('../../middlewares')
const { getOne, updateOne } = require('../controllers/CartControllers')

router.get('/carts', police_check('read', 'Cart'), getOne)
router.put('/carts', police_check('update', 'Cart'), updateOne)

module.exports = router
