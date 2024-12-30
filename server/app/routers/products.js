const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const { police_check } = require('../../middlewares');
const { getAll, createOne, updateOne, deleteOne } = require('../controllers/ProductControllers');

const upload = multer({ dest: os.tmpdir() });

router.get('/products', getAll);
router.post('/products', upload.single('image'), police_check('create', 'Product'), createOne);
router.put('/products/:id', upload.single('image'), police_check('update', 'Product'), updateOne);
router.delete('/products/:id', police_check('delete', 'Product'), deleteOne);

module.exports = router;
