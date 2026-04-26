const express = require("express");
const upload = require("../utils/multer");
const blogController = require("../controllers/blogController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  blogController.createBlog,
);
router.get("/", blogController.getAllBlogs);
router.get("/my-blogs", verifyToken, blogController.getMyBlogs);
router.get("/:slug", blogController.getBlog);
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  blogController.updateBlog,
);
router.delete("/:id", verifyToken, blogController.deleteBlog);

module.exports = router;
