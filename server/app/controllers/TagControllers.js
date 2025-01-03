const { Tag, Category, Product } = require('../models');

const getAll = async (req, res, next) => {
  try {
    let tags = await Tag.find();

    return res.status(200).json(tags);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

// const getOneByCategory = async (req, res, next) => {
//   const { category } = req.params

//   try {
//     const category_id = await Category.findOne({
//       name: {
//         $regex: category,
//         $options: 'i',
//       },
//     })
//     const products = await Product.find({ category: category_id })
//     let tagIds = []

//     products.forEach((product) => {
//       product.tags.forEach((tag) => {
//         if (!tagIds.includes(tag)) {
//           tagIds.push(tag)
//         }
//       })
//     })

//     const tags = await Tag.find({ _id: { $in: tagIds } })
//     res.status(200).json(tags)
//   } catch (err) {
//     if (err && err.name === 'ValidationError') {
//       return res.status(400).json({
//         message: err.message,
//         fields: err.errors,
//       })
//     }

//     next(err)
//   }
// }

const createOne = async (req, res, next) => {
  const payload = req.body;

  try {
    const tag = new Tag(payload);
    await tag.save();

    return res.status(201).json({
      message: 'Create tag successful',
      tag,
    });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

const updateOne = async (req, res, next) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const tag = await Tag.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: 'Update tag successful',
      tag,
    });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Delete tag successful',
      tag,
    });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  // getOneByCategory,
};
