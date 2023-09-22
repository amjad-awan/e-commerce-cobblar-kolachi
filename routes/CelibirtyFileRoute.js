const express = require("express");
const multer = require("multer");
const {
  CelibirtyFileController,
  getCelibirties,
  getCelibirtiesPhoto,
} = require("../controllers/CelibirtyFileController.js");

const router = express.Router();
const storage = multer.memoryStorage(); // Store files in memory as buffers

const upload = multer({ storage });

router.post("/create-celibirty", upload.array("photos", 5), CelibirtyFileController);
router.get("/get-celibirty-photos/:sId/photos/:photoIndex", getCelibirtiesPhoto);
router.get("/get-celibirties", getCelibirties);

module.exports = router;
