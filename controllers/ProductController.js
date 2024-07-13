
// import { ProductModal } from "../modals/ProductModal.js";
// import { CategoryModal } from "../modals/CategoryModal.js";
const ProductModal = require("../modals/ProductModal.js");
const CategoryModal = require("../modals/CategoryModal.js");


// Create a product
exports.createProductController = async (req, res) => {
  try {
    const {
      productname,
      productcategory,
      productdescription,
      productfeatures,
      oldprice,
      newprice,
      sale,
      reviews,
      featured,
    } = req.body;
    const photos = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));
    await ProductModal({
      productname,
      productdescription,
      productfeatures,
      productcategory,
      featured,
      sale,
      oldprice,
      newprice,
      reviews,
      photos,
    }).save();
    res
      .status(200)
      .json({ success: true, message: "product added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
};

// Create a Review
exports.addReviewController = async (req, res) => {
  const { pId } = req.params;
  const { username, title, body, rating, email } = req.body;
  try {
    const product = await ProductModal.findById(pId);
    await product.updateOne({
      $push: { reviews: { username, rating, title, body, email } },
    });

    res.status(200).json({
      success: true,
      message: "review added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductModal.find({ featured: true })
      .populate({
        path: "productcategory",
        select: "-photo",
      })
      .select("-photos");
    res.status(200).json({
      products,
      success: true,
      message: "products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching featured products.",
    });
  }
};
exports.searchProductsController = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;

    const regex = new RegExp(searchTerm, "i");


    // First, find categories that match the search term
    const categories = await CategoryModal.find({
      name: { $regex: regex },
    }).select("-photo");
    // Create an array to store product results
    const products = [];

    // Loop through each category and find products
    for (const cat of categories) {
      const categoryProducts = await ProductModal.find({
        productcategory: cat._id,
      })
        .populate({
          path: "productcategory",
          select: "-photo",
        }).select("-photos");

      products.push(...categoryProducts);
    }


    // Send the combined list of products as the response
    return res.status(200).json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSpecificCategoryProducts = async (req, res) => {
  const { cId } = req.params;
  try {
    const products = await ProductModal.find({ productcategory: cId })
      .populate({
        path: "productcategory",
        select: "-photo",
      })
      .select("-photos -productdescription -productfeatures -reviews");

    res.status(200).json({
      products,
      success: true,
      message: "specific category products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching featured products.",
    });
  }
};


exports.getFeaturedProductsPhoto = async (req, res) => {
  const { pId, photoIndex } = req.params;
  try {
    const product = await ProductModal.findOne({
      _id: pId,
    }).select("photos");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    if (!product.photos || product.photos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No photos found for this product." });
    }
    if (photoIndex < 0 || photoIndex >= product.photos.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid photo photoIndex." });
    }
    const requestedPhoto = product.photos[photoIndex];
    res.set("Content-type", requestedPhoto.contentType);
    return res.status(200).send(requestedPhoto.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the photo.",
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  const { pId } = req.params;
  try {
    const product = await ProductModal.findOne({ _id: pId })
      .populate({
        path: "productcategory",
        select: "-photo",
      })
      .select("-photos");
    res.status(200).json({
      product,
      success: true,
      message: "product fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching featured products.",
    });
  }
};

exports.filterAndPagination = async (req, res) => {
  const filters = req.query;
  const sortingOrder = req.query.priceSort || "lowtohigh"; // Default to lowToHigh if not provided

  const page = parseInt(filters.page) || 1;
  const pageSize = 10; // Number of items per page
  try {
    // Apply filters to the products array (implement your filtering logic)
    const products = await ProductModal.find().select("-photos");
  

    let filteredProducts = products;

    if (filters.sale === "true") {
      filteredProducts = filteredProducts.filter(
        (product) => product.sale === true
      );
    }
    if (filters.featured === "true") {
      filteredProducts = filteredProducts.filter(
        (product) => product.featured === true
      );
    }

    let currentSortingOrder;

    if (sortingOrder === "lowtohigh") {
      // If lowToHigh is requested, sort low to high
      filteredProducts = filteredProducts.sort(
        (a, b) => a.newprice - b.newprice
      );
      currentSortingOrder = "lowtohigh";
    } else if (sortingOrder === "hightolow") {
      // If highToLow is requested, sort high to low
      filteredProducts = filteredProducts.sort(
        (a, b) => b.newprice - a.newprice
      );
      currentSortingOrder = "hightolow";
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

   
    res.json({
      products: paginatedProducts,
      currentSortingOrder: currentSortingOrder, // Return the current sorting order
    });
  } catch (error) {
    console.log(error);
  }
};
