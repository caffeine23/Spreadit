const express = require("express");

const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getPostComments,
} = require("../controllers/commentController");

// const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/createComment", verifyToken, createComment)
// router.get("/getComment", verifyToken, getComment)
// router.patch("/updateComment", verifyToken, updateComment)
// router.delete("/deleteComment", verifyToken, deleteComment)
// router.get("/getPostComments", verifyToken, getPostComments)

router.post("/createComment", createComment);
router.get("/getComment/:commentId", getComment);
router.patch("/updateComment/:commentId", updateComment);
router.delete("/deleteComment/:commentId", deleteComment);
router.get("/getPostComments/:postId", getPostComments);

module.exports = router;
