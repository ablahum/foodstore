const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name must be fulfilled']
    },
    price: {
      type: Number,
      required: [true, 'Product price cannot be empty']
    },
    description: String,
    image: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  },
  { timestamps: true }
)

module.exports = model('Product', productSchema)
