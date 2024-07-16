const Post = require("../models/Post");
const User = require("../models/User");

async function createPost(req, res) {
  const { userId, content } = req.body;
  await Post.create({ userId: userId, content: content });
  res.send("Post created");
}

async function getPost(req, res) {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const user = await User.findById(post.userId);
  data = {
    post: post,
    username: user.username,
    pfp: user.userPfp,
  };
  res.send(data);
}

async function getRandomPosts(req, res) {
  try {
    const posts = await Post.aggregate([
      { $sample: { size: 10 } }, // Adjust the size as needed
      {
        $lookup: {
          from: "users", // The collection to join
          localField: "userId", // Field from the Post collection
          foreignField: "_id", // Field from the User collection
          as: "user", // The result field
        },
      },
      { $unwind: "$user" }, // To deconstruct the array and get individual user objects
      {
        $project: {
          _id: 1,
          content: 1,
          likes: 1,
          "user.username": 1,
          "user.userPfp": 1,
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updatePost(req, res) {
  const { postId } = req.params;
  const { content } = req.body;
  await Post.findByIdAndUpdate(postId, {
    content: content,
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

async function likePost(req, res) {
  try {
    const { userId } = req.body;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Add user to the list of likes if not already liked
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

async function unlikePost(req, res) {
  try {
    const { userId } = req.body;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Remove user from the list of likes if liked
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({ message: "Post unliked successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  unlikePost,
  getRandomPosts,
};
