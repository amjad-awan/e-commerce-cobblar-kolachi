const mongoose = require("mongoose");
const colors = require("colors");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
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
