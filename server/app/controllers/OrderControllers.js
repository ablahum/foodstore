const { Types } = require('mongoose')

const DeliveryAddress = require('../models/DeliveryAddress')
// const Order = require('../models/Order')
// const OrderItem = require('../models/OrderItem')
// const CartItem = require('../models/CartItem')
const { Order, OrderItem, CartItem } = require('../models')

const getAll = async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query
  const { _id } = req.user

  try {
    let count = await Order.find({ user: _id }).countDocuments()

    let orders = await Order.find({
      user: _id,
    })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate('order_items')
      .sort('-createdAt')

    return res.status(200).json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    })
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

const createOne = async (req, res, next) => {
  const { delivery_fee, delivery_address } = req.body
  const { _id } = req.user

  try {
    const items = await CartItem.find({ user: req.user._id }).populate('product')

    if (!items)
      return res.status(400).json({
        message: `You're not create order because you have not items in cart`,
      })

    const address = await DeliveryAddress.find({
      detail: delivery_address.detail,
    })

    let relatedAddress
    for (let i = 0; i < address.length; i++) relatedAddress = address[i]

    let order = new Order({
      _id: new Types.ObjectId(),
      status: 'waiting_payment',
      delivery_fee: delivery_fee,
      delivery_address: {
        provinsi: relatedAddress.provinsi,
        kabupaten: relatedAddress.kabupaten,
        kecamatan: relatedAddress.kecamatan,
        kelurahan: relatedAddress.kelurahan,
        detail: relatedAddress.detail,
      },
      user: _id,
    })

    let orderItems = await OrderItem.insertMany(
      items.map((item) => ({
        ...item,
        name: item.product.name,
        qty: parseInt(item.qty),
        price: parseInt(item.product.price),
        order: order._id,
        product: item.product._id,
      }))
    )

    orderItems.forEach((item) => order.order_items.push(item))
    order.save()
    await CartItem.deleteMany({ user: req.user._id })

    return res.status(201).json(order)
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
  createOne,
  getAll,
}
