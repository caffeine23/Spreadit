const express = require("express");

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  unlikePost,
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
router.get("/likePost/:postId", likePost);
router.get("/unlikePost/:postId", unlikePost);

module.exports = router;
