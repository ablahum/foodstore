const Product = require('../product/model')
const CartItem = require('../cart-item/model')
// const Product = require('../models/Product')
// const CartItem = require('../models/CartItem')

const getOne = async (req, res, next) => {
  const { _id } = req.user

  try {
    const items = await CartItem.find({
      user: _id,
    }).populate('product')

    return res.status(200).json(items)
  } catch (err) {
    if (err && err.name == 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      })
    }

    next(err)
  }
}

const updateOne = async (req, res, next) => {
  const { items } = req.body
  const { _id } = req.user

  try {
    const productIds = items.map((item) => item.product._id)
    const products = await Product.find({ _id: { $in: productIds } })

    const cartItems = items.map((item) => {
      let relatedProduct = products.find((product) => product._id.toString() === item.product._id)

      return {
        product: relatedProduct._id,
        price: relatedProduct.price,
        image: relatedProduct.image,
        name: relatedProduct.name,
        user: _id,
        qty: item.qty,
      }
    })

    await CartItem.deleteMany({ user: _id })
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: _id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        }
      })
    )

    return res.status(200).json(cartItems)
  } catch (err) {
    if (err && err.name == 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      })
    }
    next(err)
  }
}

module.exports = {
  getOne,
  updateOne,
}
