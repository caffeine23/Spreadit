const User = require("../models/User");

async function followUser(req, res) {
  try {
    const { userId } = req.body;
    const { followUserId } = req.params;

    if (userId === followUserId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);

    if (!user || !followUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add followUser to user's following list
    if (!user.following.includes(followUserId)) {
      user.following.push(followUserId);
      await user.save();
    }

    // Add user to followUser's followers list
    if (!followUser.followers.includes(userId)) {
      followUser.followers.push(userId);
      await followUser.save();
    }

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

async function unfollowUser(req, res) {
  try {
    const { userId } = req.body;
    const { unfollowUserId } = req.params;
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);

    if (!user || !unfollowUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove unfollowUser from user's following list
    user.following = user.following.filter(
      (id) => id.toString() !== unfollowUserId
    );
    await user.save();

    // Remove user from unfollowUser's followers list
    unfollowUser.followers = unfollowUser.followers.filter(
      (id) => id.toString() !== userId
    );
    await unfollowUser.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  followUser,
  unfollowUser,
};
