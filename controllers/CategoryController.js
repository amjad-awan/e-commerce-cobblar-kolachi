const fs = require("fs");
const CategoryModal = require("../modals/CategoryModal.js");
const multer = require("multer");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    const exists = await CategoryModal.findOne({ name });


    if (exists) {
      return res
        .status(201)
        .json({ success: false, message: "category already exists " });
    }

    const newCategory = new CategoryModal({
      name,
    });

    if (req.file) {
      newCategory.photo.data = req.file.buffer;
      newCategory.photo.contentType = req.file.mimetype;
    }

    await newCategory.save();
    res.status(200).json({ success: true, message: "new category added" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ error: validationErrors });
    }
    res
      .status(500)
      .json({ error: "An error occurred while creating the category." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModal.find().select("-photo");
    res
      .status(200)
      .json({ categories, success: true, message: "categories list fetched" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching categories.",
    });
  }
};

const searchCategoryController = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const regex = new RegExp(categoryName, "i"); // 'i' for case-insensitive search
    const products = await CategoryModal.find({
      name: { $regex: regex },
    }).select("-photo"); // Populate the category field if needed
    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found for the given category." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCategoryPhoto = async (req, res) => {
  const { catId } = req.params;
  try {
    const photo = await CategoryModal.findById(catId).select("photo");

    if (photo.photo.data) {
      res.set("Content-type", photo.photo.contentType);
      return res.status(200).send(photo.photo.data);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching photo.",
    });
  }
};
const getSingleCategory = async (req, res) => {
  const { catID } = req.params
  console.log("catID",catID)

  try {
    const category = await CategoryModal.findOne({ _id: catID })
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "No category found",
      })
    }
    console.log("category",category)
    return res.status(200).json({
      success: success,
      category: category?.name,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching category.",
    });

  }
}

module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  searchCategoryController,
  getCategoryPhoto,
};
