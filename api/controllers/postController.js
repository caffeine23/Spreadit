const Post = require("../models/Post");

async function createPost(req, res) {
  const { userId, title, description } = req.body;
  await Post.create({ userId: userId, title: title, description: description });
  res.send("Post created");
}

async function getPost(req, res) {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.send(post);
}

async function updatePost(req, res) {
  const { postId } = req.params;
  const { title, description } = req.body;
  await Post.findByIdAndUpdate(postId, {
    title: title,
    description: description,
  });
  res.send(`Post ${postId} updated.`);
}

async function deletePost(req, res) {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId);
  res.send(`Post ${postId} deleted.`);
}

async function getUserPosts(req, res) {
  const { userId } = req.params;
  const posts = await Post.find({ userId: userId });
  res.send(posts);
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
};
