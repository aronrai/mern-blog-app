const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const CustomError = require("./utils/customError");
const globalErrorController = require("./controllers/globalErrorController");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/", (req, res, next) => {
  next(new CustomError(`${req.originalUrl} does not exist.`, 404));
});

app.use(globalErrorController);

const url = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  })
  .catch((err) => console.error(`Error: ${err.message}`));
