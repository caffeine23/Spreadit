const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const User = require("../models/User");

async function createComment(req, res) {
  const { userId, postId, content } = req.body;
  await Comment.create({ userId: userId, postId: postId, content: content });
  res.send("Comment created");
}

// maybe remove later as its not really needed
async function getComment(req, res) {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  res.send(comment);
}

async function updateComment(req, res) {
  const { commentId } = req.params;
  const { content } = req.body;
  await Comment.findByIdAndUpdate(commentId, {
    content: content,
  });
  res.send(`Comment ${commentId} updated.`);
}

async function deleteComment(req, res) {
  const { commentId } = req.params;
  await Comment.findByIdAndDelete(commentId);
  res.send(`Comment ${commentId} deleted.`);
}

async function getPostComments(req, res) {
  const { postId } = req.params;

  try {
    const comments = await Comment.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          postId: 1,
          userId: 1,
          content: 1,
          "user.username": 1,
          "user.userPfp": 1,
        },
      },
    ]);

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error); // Log the error
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getPostComments,
};
