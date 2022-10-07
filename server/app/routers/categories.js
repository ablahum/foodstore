const router = require('express').Router()

const { police_check } = require('../../middlewares')
const { getAll, createOne, updateOne, deleteOne } = require('../controllers/CategoryControllers')

router.get('/categories', getAll)
router.post('/categories', police_check('create', 'Category'), createOne)
router.put('/categories/:id', police_check('update', 'Category'), updateOne)
router.delete('/categories/:id', police_check('delete', 'Category'), deleteOne)

module.exports = router
