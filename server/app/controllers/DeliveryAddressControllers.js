const { subject } = require('@casl/ability')

const { policyFor } = require('../../utils')
const DeliveryAddress = require('../deliveryAddress/model')
// const DeliveryAddress = require('../models/DeliveryAddress')

const getAll = async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query
  const id = req.user

  try {
    const total = await DeliveryAddress.find({
      user: id,
    }).countDocuments()

    const address = await DeliveryAddress.find({
      user: id,
    })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort('-createdAt')

    return res.status(200).json({
      addresses: address,
      total,
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
  const payload = req.body
  const id = req.user

  try {
    const address = new DeliveryAddress({
      ...payload,
      user: id,
    })
    await address.save()

    return res.status(201).json({
      message: 'Add address successful',
      address,
    })
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      })
    }

    next(err)
  }
}

const updateOne = async (req, res, next) => {
  const { _id, ...payload } = req.body
  const { id } = req.params
  const user = req.user

  try {
    let address = await DeliveryAddress.findById(id)
    const subjectAddress = subject('DeliveryAddress', {
      ...address,
      user_id: address.user,
    })

    const policy = policyFor(user)
    if (!policy.can('update', subjectAddress)) {
      return res.status(401).json({
        message: `You're not allowed to modify this resource`,
      })
    }

    address = await DeliveryAddress.findByIdAndUpdate(id, payload, { new: true })

    return res.status(200).json({
      message: 'Update address successful',
      address,
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

const deleteOne = async (req, res, next) => {
  let { id } = req.params
  const user = req.user

  try {
    let address = await DeliveryAddress.findById(id)
    const subjectAddress = subject('DeliveryAddress', {
      ...address,
      user_id: address.user,
    })

    const policy = policyFor(user)
    if (!policy.can('delete', subjectAddress)) {
      return res.status(401).json({
        error: 1,
        message: `You're not allowed to delete this resource`,
      })
    }

    address = await DeliveryAddress.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Delete address successful',
      address,
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

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
}
