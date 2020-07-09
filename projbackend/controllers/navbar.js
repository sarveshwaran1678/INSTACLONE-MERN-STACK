const User = require('../models/user');
const Post = require("../models/post")


exports.getNotifications = (req, res) => {
    let user = req.profile

    let skipCount = req.body.skipCount || 0

    User.findById(user._id)
        .populate("UpdateNotification.UserId", "username profilePicPath")
        .limit(8)
        .skip(8 * skipCount)
        .then((notification) => {
            return res.send(notification)
        }).catch((err) => {
            return res.status(500).send(err)
        })
}

exports.searchUsers = (req, res) => {
    let skipCount = req.body.skipCount || 0

    User.find({ username: req.body.searchTerm })
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

let followings
exports.getUserFeed = (req, res) => {
    followings = req.profile.followings

}