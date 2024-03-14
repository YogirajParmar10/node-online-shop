const path = require("path");

const express = require("express");

const { body } = require("express-validator");

// const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

// admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// admin/add-product => POST
router.post(
  "/add-product",
  isAuth,

  [
    body("title", "Invalid title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat().withMessage("Invalid Price"),
    body("description", "Invalid Description")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],

  adminController.postAddProduct
);

// // admin/porducts => GET
router.get("/products", isAuth, adminController.getProducts);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("title").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

// exports.routes = router;
// exports.products = products;

module.exports = router;
