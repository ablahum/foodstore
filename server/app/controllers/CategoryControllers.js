// const Category = require('../models/Category')
const { Category } = require('../models')

const getAll = async (req, res, next) => {
  try {
    const category = await Category.find()

    return res.status(200).json(category)
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

const createOne = async (req, res, next) => {
  const payload = req.body

  try {
    const category = new Category(payload)
    await category.save()

    return res.status(201).json({
      message: 'Create category successful',
      category,
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
  const payload = req.body
  const { id } = req.params

  try {
    const category = await Category.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json({
      message: 'Update category successful',
      category,
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

const deleteOne = async (req, res, next) => {
  const { id } = req.params

  try {
    const category = await Category.findByIdAndDelete(id)

    return res.status(200).json({
      message: 'Delete category successful',
      category,
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

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
}
