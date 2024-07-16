const express = require("express");

const { followUser, unfollowUser } = require("../controllers/userController");

const router = express.Router();

router.post("/followUser/:followUserId", followUser);
router.post("/unfollowUser/:unfollowUserId", unfollowUser);

module.exports = router;
