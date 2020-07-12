const User = require('../models/user');
const Post = require("../models/post")


exports.getNotifications = async (req, res) => {
    let user = req.profile

    let skipCount = req.body.skipCount || 0

    await User.findById(user._id)
        .populate("UpdateNotification.UserId", "username profilePicPath")
        .limit(8)
        .skip(8 * skipCount)
        .then((notification) => {
            return res.send(notification)
        }).catch((err) => {
            return res.status(500).send(err)
        })
}

exports.searchUsers = async (req, res) => {
    let skipCount = req.body.skipCount || 0

    await User.find({ username: req.body.searchTerm })
        .limit(10)
        .skip(10 * skipCount)
        .then((result) => {
            return res.send(result)
        })
        .catch((err) => {
            return res.status(500).send(err)
        })
}


//global array
//load more feed //take count
//load comments 
//load replies

exports.getUserFeed = async (req, res) => {
    let followings = req.profile.followings


    await Post.find({ UserId: { $in: followings }, isStory: false })
        .sort({ 'updatedAt': 1 })
        .exec((err, posts) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send(posts)
        })
}

