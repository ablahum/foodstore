const router = require('express').Router()
const { police_check } = require('../../middlewares')
const { getAll, getOneByCategory, createOne, updateOne, deleteOne } = require('../controllers/TagControllers')

router.get('/tags', getAll)
// router.get('/tags/:category', getOneByCategory)
router.post('/tags', police_check('create', 'Tag'), createOne)
router.put('/tags/:id', police_check('update', 'Tag'), updateOne)
router.delete('/tags/:id', police_check('delete', 'Tag'), deleteOne)

module.exports = router
