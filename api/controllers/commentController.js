const Comment = require("../models/Comment");

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
  const comments = await Comment.find({ postId: postId });
  res.send(comments);
}

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getPostComments,
};
