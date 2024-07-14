const mongoose = require("mongoose");
const colors = require("colors");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://amjadmalikf53:q3jEKvfzQ8wW2zGt@cluster0.u9wrz2m.mongodb.net/cobblar-and-kolachi", {
      dbName: "cobblar-and-kolachi", // Specify the database name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Database is connected to host ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in database connection: ${error}`.bgRed.white);
  }
};
