const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("products/delete");
router.get("/products/:productId", shopController.getProductById);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrder);
router.get("/checkout", shopController.getCheckout);
router.post("/cart-delete-item", shopController.deleteitemfromcart);
// router.get("/cart");

module.exports = router;
