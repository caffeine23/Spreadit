const express = require("express");

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../controllers/postController");

// const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/createPost", verifyToken, createPost)
// router.get("/getPost", verifyToken, getPost)
// router.patch("/updatePost", verifyToken, updatePost)
// router.delete("/deletePost", verifyToken, deletePost)
// router.get("/getUserPosts", verifyToken, getUserPosts)

router.post("/createPost", createPost);
router.get("/getPost", getPost);
router.patch("/updatePost", updatePost);
router.delete("/deletePost", deletePost);
router.get("/getUserPosts", getUserPosts);

module.exports = router;
