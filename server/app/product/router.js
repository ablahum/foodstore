const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const { police_check } = require("../../middlewares");
const controller = require("./controller");

// MULTER TMP DIRECTORY
const upload = multer({ dest: os.tmpdir() });

// SHOW PRODUCTS
router.get("/products", controller.index);

// ADD PRODUCT
router.post("/products", upload.single("image"), police_check("create", "Product"), controller.store);

// UPDATE PRODUCT
router.put("/products/:id", upload.single("image"), police_check("update", "Product"), controller.update);

// DELETE PRODUCT BY ID
router.delete("/products/:id", police_check("delete", "Product"), controller.destroy);

module.exports = router;
