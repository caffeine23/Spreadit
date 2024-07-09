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
router.get("/getPost/:postId", getPost);
router.patch("/updatePost/:postId", updatePost);
router.delete("/deletePost/:postId", deletePost);
router.get("/getUserPosts/:userId", getUserPosts);

module.exports = router;
