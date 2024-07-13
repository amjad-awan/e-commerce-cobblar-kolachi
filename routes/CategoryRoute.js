const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryPhoto,
  searchCategoryController,
  getSingleCategory,
} = require("../controllers/CategoryController.js"); // Update the path
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage(); // Store files in memory as buffers

const upload = multer({ storage });

// Create a category
router.post("/create", upload.single("photo"), createCategory);
router.get("/get-categories", getCategories);
router.get("/get-category-photo/:catId", getCategoryPhoto);
router.get("/single-category/:catID",getSingleCategory)
router.get('/search-category/:categoryName', searchCategoryController);

module.exports = router;
