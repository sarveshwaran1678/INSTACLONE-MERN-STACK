const User = require('../models/user');
const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;

exports.getUserById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User Not found in DB',
            });
        }
        req.profile = user;
        next();
    });
};

exports.getAnotherUserById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User Not found in DB',
            });
        }
        req.anotherProfile = user;
        next();
    });
};

//for user to get his details
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};

//for user to get another User details
exports.getAnotherUser = (req, res) => {
    req.anotherProfile.salt = undefined;
    req.anotherProfile.encry_password = undefined;
    req.anotherProfile.createdAt = undefined;
    req.anotherProfile.updatedAt = undefined;
    req.anotherProfile.followRequestPending = undefined;
    req.anotherProfile.followRequestSent = undefined;
    //includes logic

    return res.json(req.anotherProfile);
};

exports.updatePassword = (req, res) => {
    let user = req.profile;

    let { oldPassword, newPassword } = req.body;

    if (user.authenticate(oldPassword)) {
        if (newPassword.length > 5 && newPassword.length < 15) {
            user.password = newPassword;

            user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Updation of password failed',
                    });
                }
                return res.status(201).json({
                    message: 'Password updated succesfully',
                });
            });
        } else {
            return res.status(400).json({
                error: 'Length of password should be >5  <15',
            });
        }
    } else {
        return res.status(400).json({
            error: "Old password didn't match",
        });
    }
};

//Middleware Update Profile Photo
exports.updateProfilePhoto = (req, res) => {
    let user = req.profile;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req).on('file', function (name, file) {
        const path = file.path;
        const uniqueFilename = user._id;
        if (file.path.match(/\.(jpg|jpeg|png)$/) && file.size < 5000000) {
            cloudinary.uploader.upload(
                path,
                {
                    public_id: `InstaClone/${uniqueFilename}`,
                    tags: `InstaClone`,
                }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err);
                    console.log('file uploaded to Cloudinary');

                    user.profilePicPath = image.public_id;
                    user.pictureUrl = image.url;
                    // console.log(user);
                    user.save((err, user) => {
                        if (err) {
                            res.status(400).json({
                                error: err,
                            });
                        }
                        return res.json(user);
                    });
                }
            );
        } else {
            return res.json({
                error: 'Invalid File Type',
            });
        }
    });
};

//Update User
exports.updateUser = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        //updation code
        let user = req.profile;
        user = _.extend(user, fields);
        user.save((err, user) => {
            if (err) {
                res.status(400).json({
                    error: err,
                });
            }
            res.json(user);
        });
    });
};

exports.followToggle = (req, res) => {
    let user = req.profile;
    let anotherUser = req.anotherProfile;
    let userName = user.username;
    let anotherUserName = anotherUser.username;
    let { followings, followRequestSent } = user;
    let { followers, followRequestPending } = anotherUser;

    if (anotherUser.isPrivate) {
        if (followers.includes(user._id)) {
            User.bulkWrite(
                [
                    {
                        updateOne: {
                            filter: { _id: user._id },
                            update: {
                                $pull: { followings: anotherUser._id },
                            },
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id: anotherUser._id },
                            update: { $pull: { followers: user._id } },
                        },
                    },
                ],
                {},
                (err, users) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    return res.status(201).json({
                        message: userName + ' unfollowed ' + anotherUserName,
                    });
                }
            );
        } else if (
            followRequestSent.includes(anotherUser._id) &&
            followRequestPending.includes(user._id)
        ) {
            User.bulkWrite(
                [
                    {
                        updateOne: {
                            filter: { _id: user._id },
                            update: {
                                $pull: { followRequestSent: anotherUser._id },
                            },
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id: anotherUser._id },
                            update: {
                                $pull: { followRequestPending: user._id },
                            },
                        },
                    },
                ],
                {},
                (err, users) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    return res.status(201).json({
                        message:
                            userName +
                            ' cancelled follow request sent to ' +
                            anotherUserName,
                    });
                }
            );
        } else {
            User.bulkWrite(
                [
                    {
                        updateOne: {
                            filter: { _id: user._id },
                            update: {
                                $push: { followRequestSent: anotherUser._id },
                            },
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id: anotherUser._id },
                            update: {
                                $push: { followRequestPending: user._id },
                            },
                        },
                    },
                ],
                {},
                (err, users) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    return res.status(201).json({
                        message:
                            userName +
                            ' have sent follow request to ' +
                            anotherUserName,
                    });
                }
            );
        }
    } else {
        if (followers.includes(user._id)) {
            User.bulkWrite(
                [
                    {
                        updateOne: {
                            filter: { _id: user._id },
                            update: {
                                $pull: { followings: anotherUser._id },
                            },
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id: anotherUser._id },
                            update: { $pull: { followers: user._id } },
                        },
                    },
                ],
                {},
                (err, users) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    return res.status(201).json({
                        message: userName + ' unfollowed ' + anotherUserName,
                    });
                }
            );
        } else {
            User.bulkWrite(
                [
                    {
                        updateOne: {
                            filter: { _id: user._id },
                            update: {
                                $push: { followings: anotherUser._id },
                            },
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id: anotherUser._id },
                            update: { $push: { followers: user._id } },
                        },
                    },
                ],
                {},
                (err, users) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    return res.status(201).json({
                        message:
                            userName + ' started Following ' + anotherUserName,
                    });
                }
            );
        }
    }
};

exports.followRequestHandler = (req, res) => {
    let { accept } = req.body;
    let user = req.profile;
    let anotherUser = req.anotherProfile;
    let userName = user.username;
    let anotherUserName = anotherUser.username;
    if (user.followRequestPending.includes(anotherUser._id) === false) {
        return res.json({ msg: 'No request received' });
    }
    if (accept === 'yes') {
        User.bulkWrite(
            [
                {
                    updateMany: {
                        filter: { _id: anotherUser._id },
                        update: {
                            $pull: { followRequestSent: user._id },
                            $push: { followings: user._id },
                        },
                    },
                },
                {
                    updateMany: {
                        filter: { _id: user._id },
                        update: {
                            $push: { followers: anotherUser._id },
                            $pull: { followRequestPending: anotherUser._id },
                        },
                    },
                },
            ],
            {},
            (err, users) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                return res.status(201).json({
                    message:
                        userName +
                        ' accepted follow request of ' +
                        anotherUserName,
                });
            }
        );
    } else {
        User.bulkWrite(
            [
                {
                    updateMany: {
                        filter: { _id: anotherUser._id },
                        update: {
                            $pull: { followRequestSent: user._id },
                        },
                    },
                },
                {
                    updateMany: {
                        filter: { _id: user._id },
                        update: {
                            $pull: { followRequestPending: anotherUser._id },
                        },
                    },
                },
            ],
            {},
            (err, users) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                return res.status(201).json({
                    message:
                        userName +
                        ' denied follow request of ' +
                        anotherUserName,
                });
            }
        );
    }
};

exports.toggleIsPrivate = (req, res) => {
    let user = req.profile;

    user.isPrivate = !user.isPrivate;

    user.save((err, user) => {
        if (err) {
            return res.status(500).json({
                error: 'DB error',
            });
        }

        return res.status(201).json({
            message: 'isPrivate changed',
        });
    });
};
