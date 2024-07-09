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
router.get("/getComment", getComment);
router.patch("/updateComment", updateComment);
router.delete("/deleteComment", deleteComment);
router.get("/getPostComments", getPostComments);

module.exports = router;
