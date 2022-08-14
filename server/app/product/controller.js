const path = require("path");
const fs = require("fs");
const Product = require("./model");
const Category = require("../category/model");
const Tags = require("../tag/model");

const index = async (req, res, next) => {
  const { page = 1, perPage = 8, tags = [], category = "", q = "" } = req.query;
  try {
    let criteria = {};

    if (q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: "i" },
      };
    }

    if (category.length) {
      let categoryResult = await Category.findOne({ name: { $regex: `${category}` }, $options: "i" });
      if (categoryResult) {
        criteria = { ...criteria, category: categoryResult._id };
      }
    }

    if (tags.length) {
      let tagsResult = await Tags.find({ name: { $in: tags } });
      if (tagsResult.length > 0) {
        criteria = { ...criteria, tags: { $in: tagsResult.map((tag) => tag._id) } };
      }
    }

    let total = await Product.find().countDocuments();
    const product = await Product.find(criteria)
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .populate("category")
      .populate("tags");

    return res.json({
      products: product,
      total,
    });
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  let payload = req.body;
  try {
    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: "i" } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    if (payload.tags && payload.tags.length > 0) {
      let tags = await Tags.find({ name: { $in: payload.tags } });
      if (tags.length) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      } else {
        delete payload.tags;
      }
    }

    if (req.file) {
      let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
      let fileName = req.file.filename + "." + originalExt;
      let tmpPath = req.file.path;
      let targetPath = path.resolve(`public/${fileName}`);

      const src = fs.createReadStream(tmpPath);
      const dest = fs.createWriteStream(targetPath);
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = new Product({
            ...payload,
            image: fileName,
          });
          await product.save();

          return res.json({
            message: "Add product successful",
            product,
          });
        } catch (err) {
          fs.unlinkSync(targetPath);
          if (err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              details: err.errors,
            });
          }

          next(err);
        }
      });
    } else {
      let product = new Product(payload);
      await product.save();

      return res.json({
        message: "Add product successful",
        product,
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        details: err.errors,
      });
    }

    next(err);
  }
};

const update = async (req, res, next) => {
  let { id } = req.params;
  let payload = req.body;
  try {
    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: "i" } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    if (payload.tags && payload.tags.length > 0) {
      let tags = await Tags.find({ name: { $in: payload.tags } });
      if (tags.length) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      } else {
        delete payload.tags;
      }
    }

    if (req.file) {
      let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
      let fileName = req.file.filename + "." + originalExt;
      let tmpPath = req.file.path;
      let targetPath = path.resolve(`public/${fileName}`);

      const src = fs.createReadStream(tmpPath);
      const dest = fs.createWriteStream(targetPath);
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = await Product.findById(id);
          let currentImage = `public/${product.image}`;

          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          let result = await Product.findByIdAndUpdate(id, {
            ...payload,
            image: fileName,
          });

          return res.json({
            message: "Update product successful",
            product: result,
          });
        } catch (err) {
          fs.unlinkSync(targetPath);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              details: err.errors,
            });
          }

          next(err);
        }
      });
    } else {
      let product = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });

      return res.json({
        message: "Update product successful",
        product,
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        details: err.errors,
      });
    }

    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    let product = await Product.findByIdAndDelete(id);
    let currentImage = `public/${product.image}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    return res.json({
      message: "Delete product successful",
      product,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
