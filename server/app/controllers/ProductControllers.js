const path = require('path');
const fs = require('fs');

const { Product, Category, Tag } = require('../models');

const getAll = async (req, res, next) => {
  const { page = 1, perPage = 8, tags = [], category = '', q = '' } = req.query;

  try {
    let criteria = {};

    if (q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: 'i' },
      };
    }

    // change category name to category id
    if (category.length) {
      const categoryResult = await Category.findOne({
        // POPULATE
        name: {
          $regex: `${category}`,
        },
        $options: 'i',
      });

      if (categoryResult) {
        criteria = {
          ...criteria,
          category: categoryResult._id,
        };
      }
    }

    // change tags name to tags id
    if (tags.length) {
      const tagsResult = await Tag.find({
        name: {
          $in: tags,
        },
      });

      if (tagsResult.length > 0) {
        criteria = {
          ...criteria,
          tags: {
            $in: tagsResult.map((tag) => tag._id),
          },
        };
      }
    }

    const total = await Product.find().countDocuments();

    const product = await Product.find(criteria)
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .populate('category')
      .populate('tags');

    return res.status(200).json({
      products: product,
      total,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  let payload = req.body;
  const image = req.file;

  try {
    // change category name to category id
    if (payload.category) {
      const category = await Category.findOne({
        // populate
        name: {
          $regex: payload.category,
          $options: 'i',
        },
      });

      if (category) {
        payload = {
          ...payload,
          category: category._id,
        };
      } else {
        delete payload.category;
      }
    }

    // change tags name to tags id
    if (payload.tags && payload.tags.length > 0) {
      const tagsArr = [];

      payload.tags.forEach((tag) => {
        let separated = tag.split(', ');

        separated.forEach((str) => tagsArr.push(str));
      });

      const tags = await Tag.find({
        name: {
          $in: tagsArr,
        },
      });

      if (tags.length) {
        payload = {
          ...payload,
          tags: tags.map((tag) => tag._id),
        };
      } else {
        delete payload.tags;
      }
    }

    if (image) {
      // get image extension
      const originalExt = image.originalname.split('.')[image.originalname.split('.').length - 1];

      const fileName = `${image.filename}.${originalExt}`;
      const _path = image.path;

      const targetPath = path.resolve(`public/${fileName}`);

      const src = fs.createReadStream(_path);
      const dest = fs.createWriteStream(targetPath);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          const product = new Product({
            ...payload,
            image: fileName,
          });

          await product.save();

          return res.status(201).json({
            message: 'Add product successful',
            product,
          });
        } catch (err) {
          fs.unlinkSync(targetPath);

          if (err.name === 'ValidationError') {
            return res.status(400).json({
              message: err.message,
              details: err.errors,
            });
          }

          next(err);
        }
      });
    } else {
      const product = new Product(payload);
      await product.save();

      return res.status(201).json({
        message: 'Add product successful',
        product,
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        details: err.errors,
      });
    }

    next(err);
  }
};

const updateOne = async (req, res, next) => {
  let { id } = req.params;
  let payload = req.body;
  const image = req.file;

  try {
    // change category name to category id
    if (payload.category) {
      const category = await Category.findOne({
        // populate
        name: {
          $regex: payload.category,
          $options: 'i',
        },
      });

      if (category) {
        payload = {
          ...payload,
          category: category._id,
        };
      } else {
        delete payload.category;
      }
    }

    // change tags name to tags id
    if (payload.tags && payload.tags.length > 0) {
      const tagsArr = [];

      payload.tags.forEach((tag) => {
        let separated = tag.split(', ');

        separated.forEach((str) => tagsArr.push(str));
      });

      const tags = await Tag.find({
        name: {
          $in: tagsArr,
        },
      });

      if (tags.length) {
        payload = {
          ...payload,
          tags: tags.map((tag) => tag._id),
        };
      } else {
        delete payload.tags;
      }
    }

    if (image) {
      // get image extension
      const originalExt = image.originalname.split('.')[image.originalname.split('.').length - 1];

      const fileName = `${image.filename}.${originalExt}`;
      const _path = image.path;

      const targetPath = path.resolve(`public/${fileName}`);

      const src = fs.createReadStream(_path);
      const dest = fs.createWriteStream(targetPath);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          const product = await Product.findById(id);
          const currentImage = `public/${product.image}`;

          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          let result = await Product.findByIdAndUpdate(
            id,
            {
              ...payload,
              image: fileName,
            },
            { new: true }
          );

          return res.status(200).json({
            message: 'Update product successful',
            product: result,
          });
        } catch (err) {
          fs.unlinkSync(targetPath);
          if (err && err.name === 'ValidationError') {
            return res.status(400).json({
              error: 1,
              message: err.message,
              details: err.errors,
            });
          }

          next(err);
        }
      });
    } else {
      const product = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: 'Update product successful',
        product,
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        details: err.errors,
      });
    }

    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    let product = await Product.findByIdAndDelete(id);
    let currentImage = `public/${product.image}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    return res.status(200).json({
      message: 'Delete product successful',
      product,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
