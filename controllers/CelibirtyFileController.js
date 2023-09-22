const  CelibirtiesModal  = require("../modals/CelibirtyFileModal.js");

const CelibirtyFileController = async (req, res) => {
  try {
    const { name } = req.body;
    const photos = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));
    await new CelibirtiesModal({
      name,
      photos,
    }).save();
    res
      .status(200)
      .json({ success: true, message: "Celibirty added successfully" });
  } catch (error) {
    console.error("Error creating Celibirtt:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the Celibirtt." });
  }
};

const getCelibirties = async (req, res) => {
  try {
    let Celibirties = await CelibirtiesModal.find().select("-photos");

    res.status(200).json({
      Celibirties,
      success: true,
      message: "Celibirties fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching featured Celibirties.",
    });
  }
};

const getCelibirtiesPhoto = async (req, res) => {
  const { sId, photoIndex } = req.params;
  try {
    const Celibirty = await CelibirtiesModal.findOne({
      _id: sId,
    }).select("photos");

    if (!Celibirty) {
      return res
        .status(404)
        .json({ success: false, message: "Celibirty not found." });
    }
    if (!Celibirty.photos || Celibirty.photos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No photos found for this Celibirty.",
      });
    }
    if (photoIndex < 0 || photoIndex >= Celibirty.photos.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid photo photoIndex." });
    }
    const requestedPhoto = Celibirty.photos[photoIndex];
    res.set("Content-type", requestedPhoto.contentType);
    return res.status(200).send(requestedPhoto.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the photo.",
    });
  }
};

module.exports = {
  CelibirtyFileController,
  getCelibirties,
  getCelibirtiesPhoto,
};
