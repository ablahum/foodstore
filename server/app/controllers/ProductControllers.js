const path = require('path')
const fs = require('fs/promises')
const { createReadStream, createWriteStream } = require('fs')

const { Product, Category, Tag } = require('../models')

const getAll = async (req, res, next) => {
  const { page = 1, perPage = 8, tags = [], category = '', q = '' } = req.query

  try {
    let criteria = {}

    if (q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: 'i' }
      }
    }

    // change category name to category id
    if (category.length) {
      const categoryResult = await Category.findOne({
        // POPULATE
        name: {
          $regex: `${category}`
        },
        $options: 'i'
      })

      if (categoryResult) {
        criteria = {
          ...criteria,
          category: categoryResult._id
        }
      }
    }

    // change tags name to tags id
    if (tags.length) {
      const tagsResult = await Tag.find({
        name: {
          $in: tags
        }
      })

      if (tagsResult.length > 0) {
        criteria = {
          ...criteria,
          tags: {
            $in: tagsResult.map((tag) => tag._id)
          }
        }
      }
    }

    const total = await Product.find().countDocuments()

    const product = await Product.find(criteria)
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .populate('category')
      .populate('tags')

    return res.status(200).json({
      products: product,
      total
    })
  } catch (err) {
    next(err)
  }
}

const createOne = async (req, res, next) => {
  let payload = req.body
  const image = req.file

  try {
    // change category name to category id
    if (payload.category) {
      const category = await Category.findOne({
        // populate
        name: {
          $regex: payload.category,
          $options: 'i'
        }
      })

      if (category) {
        payload = {
          ...payload,
          category: category._id
        }
      } else {
        delete payload.category
      }
    }

    // change tags name to tags id
    if (payload.tags && payload.tags.length > 0) {
      const tagsArr = payload.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const tags = await Tag.find({
        name: { $in: tagsArr }
      })

      if (tags.length) {
        payload = {
          ...payload,
          tags: tags.map((tag) => tag._id)
        }
      } else {
        delete payload.tags
      }
    }

    if (image) {
      const ext = path.extname(image.originalname)
      const fileName = `${image.filename}${ext}`
      const targetPath = path.resolve(`public/${fileName}`)

      try {
        await fs.rename(image.path, targetPath)

        const product = new Product({
          ...payload,
          image: fileName
        })

        await product.save()

        return res.status(201).json({
          message: 'Add product successful',
          product
        })
      } catch (err) {
        await fs.unlink(image.path).catch(() => {})
        next(err)
      }
    } else {
      const product = new Product(payload)
      await product.save()

      return res.status(201).json({
        message: 'Add product successful',
        product
      })
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        details: err.errors
      })
    }

    next(err)
  }
}

const updateOne = async (req, res, next) => {
  let { id } = req.params
  let payload = req.body
  const image = req.file

  try {
    if (payload.category) {
      const category = await Category.findOne({
        name: { $regex: payload.category, $options: 'i' }
      })

      if (category) {
        payload.category = category._id
      } else {
        delete payload.category
      }
    }

    if (payload.tags && typeof payload.tags === 'string') {
      const tagsArr = payload.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const tags = await Tag.find({
        name: { $in: tagsArr }
      })

      if (tags.length) {
        payload.tags = tags.map((tag) => tag._id)
      } else {
        delete payload.tags
      }
    }

    if (image) {
      const originalExt = image.originalname.split('.').pop()
      const fileName = `${image.filename}.${originalExt}`
      const tempPath = image.path
      const targetPath = path.resolve(process.cwd(), 'public', fileName)

      await new Promise((resolve, reject) => {
        const src = createReadStream(tempPath)
        const dest = createWriteStream(targetPath)
        src.pipe(dest)
        src.on('end', resolve)
        src.on('error', reject)
      })

      const product = await Product.findById(id)
      const currentImagePath = path.resolve(process.cwd(), 'public', product.image)

      await fs
        .access(currentImagePath)
        .then(() => fs.unlink(currentImagePath))
        .catch(() => {})

      payload.image = fileName

      const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
      })

      return res.status(200).json({
        message: 'Update product successful',
        product: updatedProduct
      })
    } else {
      delete payload.image

      const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
      })

      return res.status(200).json({
        message: 'Update product successful',
        product: updatedProduct
      })
    }
  } catch (err) {
    if (image) {
      const tempPath = image.path
      await fs.unlink(tempPath).catch(() => {})
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: err.message,
        details: err.errors
      })
    }

    next(err)
  }
}

const deleteOne = async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndDelete(id)

    if (!product) return res.status(404).json({ message: 'Product not found' })

    const currentImage = path.resolve(__dirname, `../../public/${product.image}`)

    try {
      await fs.access(currentImage)
      await fs.unlink(currentImage)
    } catch (err) {
      console.error(err)
    }

    return res.status(200).json({
      message: 'Delete product successful',
      product
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne
}
