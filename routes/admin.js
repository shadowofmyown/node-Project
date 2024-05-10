const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
// /admin/add-product => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

module.exports = router;
// exports.products = products;w
