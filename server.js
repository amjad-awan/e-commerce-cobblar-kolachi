const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path=require("path")
const {
  AuthRoute,
  CategoryRoute,
  OrderRoute,
  CelibirtyFileRoute,
  ProductRoute,
} = require("./routes/index.js");
const { connectDB } = require("./db.js");
const cors = require("cors");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();

// Apply CORS middleware
app.use(cors());

app.use(bodyParser.json());

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/celibiriest", CelibirtyFileRoute);
app.use("/api/v1/orders", OrderRoute);

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get("*", (req, res) => {
  res.send("api working");
});
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
