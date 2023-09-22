const express = require("express");
const multer = require("multer");
const {
  addReviewController,
  createProductController,
  filterAndPagination,
  getFeaturedProducts,
  getFeaturedProductsPhoto,
  getSingleProduct,
  getSpecificCategoryProducts,
  searchProductsController,
} = require("../controllers/ProductController.js");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

// Create a product
router.post(
  "/create-product",
  upload.array("photos", 5),
  createProductController
);
router.get("/get-featured-products", getFeaturedProducts);
router.get(
  "/get-featured-product-photos/:pId/photos/:photoIndex",
  getFeaturedProductsPhoto
);
router.get("/get-single-product/:pId", getSingleProduct);
router.get("/get-specific-category-products/:cId", getSpecificCategoryProducts);
router.post("/add-product-review/:pId", addReviewController);
router.get("/filter-and-pagination", filterAndPagination);
router.get("/search-products/:searchTerm", searchProductsController);

module.exports = router;
