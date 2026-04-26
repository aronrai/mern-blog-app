const CustomError = require("../utils/customError");

const globalErrorController = (err, req, res, next) => {
  if (err.name === "CastError") {
    err = new CustomError("Blog Id is invalid", 400);
  }
  if (err.code === 11000) {
    err = new CustomError(
      "Email is already registered. Please try logging in.",
      400,
    );
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    err = new CustomError("File is too large! Maximum limit is 3MB", 400);
  }
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
      status: err.status || "error",
    });
  } else {
    console.log(err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: "Something went erong",
      status: "error",
    });
  }
};

module.exports = globalErrorController;

// const CustomError = require("../utils/customError");

// const globalErrorController = (err, req, res, next) => {
//   if (err.name === "CastError") {
//     err = new CustomError(`Invalid ${err.path}: ${err.value}`, 400);
//   }
//   if (err.code === 11000) {
//     err = new CustomError(
//       "That email is already registered. Please try logging in.",
//       400,
//     );
//   }
//   if (err.code === "LIMIT_FILE_SIZE") {
//     err = new CustomError("File is too large! Maximum limit is 3MB", 400);
//   }
//   if (err.name === "ValidationError") {
//     err = new CustomError(err.message, 400);
//   }
//   if (err.isOperational) {
//     res.status(err.statusCode || 500).json({
//       success: false,
//       message: err.message,
//     });
//   } else {
//     console.error("ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "Something went very wrong on our end.",
//     });
//   }
// };

// module.exports = globalErrorController;
