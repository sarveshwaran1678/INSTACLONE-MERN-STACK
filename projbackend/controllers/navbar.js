const User = require("../models/user");
const Post = require("../models/post");

exports.getNotifications = async (req, res) => {
  let user = req.profile;

  await User.findById(user._id)
    .then((user) => {
      return res.send(user.updateNotification);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

exports.searchUsers = async (req, res) => {
  let search = req.body.searchTerm;

  let val = new RegExp(`^${search}|${search}$|${search}`, "gi");

  await User.find({ username: { $regex: val } })
    .select("username profilePicPath ")
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

//global array
//load more feed //take count
//load commentsS
//load replies

exports.getUserFeed = async (req, res) => {
  let followings = req.profile.followings;

  await Post.find({ UserId: { $in: followings }, isStory: false })
    .sort({ createdAt: 1 })
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(posts);
    });
};

exports.discoverFeed = async (req, res) => {
  await Post.find({ isStory: false })
    .select("filter picturePath pictureUrl")
    .sort({ createdAt: -1 })
    .limit(15)
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(posts);
    });
};
