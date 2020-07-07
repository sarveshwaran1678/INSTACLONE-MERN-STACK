const User = require('../models/user');
const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
    // req.profile.followers = req.profile.followers.length;
    // req.profile.followings = req.profile.followings.length;
    return res.json(req.profile);
};

//for user to get another User details
exports.getAnotherUser = (req, res) => {
    req.anotherProfile.salt = undefined;
    req.anotherProfile.encry_password = undefined;
    req.anotherProfile.createdAt = undefined;
    req.anotherProfile.updatedAt = undefined;
    // req.anotherProfile.followers = req.anotherProfile.followers.length
    // req.anotherProfile.followings = req.anotherProfile.followings.length
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

// exports.getAllUsers=(req,res)=>{
//     User.find((err,user)=>{
//         if(err||!user)
//         {
//             return res.status(400).json({
//                 error:"User not found / DB error"
//             })
//         }
//         return res.json(user)
//     })
// }

//Middleware Update Profile Photo
exports.updateProfile = (req, res, next) => {
    let user = req.profile;
    let photoName = user._id;
    let photoPath = '/assets/' + photoName + '.png';

    fs.stat(__dirname + '/assets/' + photoName + '.png', function (err, stats) {
        fs.unlink(__dirname + '/assets/' + photoName + '.png', function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.on('file', function (name, file) {
        // console.log(file);
        //Checking File Extension(only jpg/jpeg/png) and Size(upto 5mb)
        if (file.path.match(/\.(jpg|jpeg|png)$/) && file.size < 5000000) {
            Jimp.read(file.path, (err, lenna) => {
                lenna
                    .resize(300, 300) // resize
                    .quality(100) // set JPEG quality
                    .write(__dirname + '/assets/' + photoName + '.png'); // save

                console.log('Uploaded');
            });
            console.log('Uploading....');
            user.profilePicPath = photoPath;
        } else {
            user.profilePicPath = null;
        }
    });

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }
    });

    next();
};

//Update User
exports.updateUser = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //updation code
        let user = req.profile;
        user = _.extend(user, fields);

        if (user.profilePicPath === null) {
            res.status(400).json({
                error: 'Upload Valid Image',
            });
        } else if (user.profilePicPath !== null) {
            user.save((err, user) => {
                if (err) {
                    res.status(400).json({
                        error: 'Updation of user failed',
                    });
                }
                res.json(user);
            });
        }
    });
    console.log('Done');
};

exports.followToggle = (req, res) => {
    let user = req.profile;
    let anotherUser = req.anotherProfile;

    let { followings, followRequestSent } = user;
    let { followers, followRequestPending } = anotherUser;

    //checking receiver is private and not not followed by sender
    //if sender is already follower of receiver ,receiver is no longer private sender
    if (
        anotherUser.isPrivate &&
        followings.includes(anotherUser._id) === false
    ) {
        let followRequestSentUpdated, followRequestPendingUpdated;

        //To unfollow If already following
        if (followings.includes(anotherUser._id)) {
            followingsUpdated = followings.filter(
                (id) => id === anotherUser._id
            );
            followersUpdated = followers.filter((id) => id === user._id);
        }

        //To delete follow request
        if (followRequestSent.includes(anotherUser._id)) {
            followRequestSentUpdated = followRequestSent.filter(
                (id) => id === anotherUser._id
            );
            followRequestPendingUpdated = followRequestPending.filter(
                (id) => id === user._id
            );
        } else {
            followRequestSentUpdated = [...followRequestSent, anotherUser._id];
            followRequestPendingUpdated = [...followRequestPending, user._id];
        }

        User.bulkWrite(
            [
                {
                    updateOne: {
                        filter: { _id: user._id },
                        update: { followRequestSent: followRequestSentUpdated },
                    },
                },
                {
                    updateOne: {
                        filter: { _id: anotherUser._id },
                        update: {
                            followRequestPending: followRequestPendingUpdated,
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
                    message: 'Follow Request Updated',
                });
            }
        );
    } else {
        let followingsUpdated, followersUpdated;

        if (followings.includes(anotherUser._id)) {
            followingsUpdated = followings.filter(
                (id) => id === anotherUser._id
            );
            followersUpdated = followers.filter((id) => id === user._id);
        } else {
            followingsUpdated = [...followings, anotherUser._id];
            followersUpdated = [...followers, user._id];
        }

        User.bulkWrite(
            [
                {
                    updateOne: {
                        filter: { _id: user._id },
                        update: { followings: followingsUpdated },
                    },
                },
                {
                    updateOne: {
                        filter: { _id: anotherUser._id },
                        update: { followers: followersUpdated },
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
                    message: 'Follow Request Updated',
                });
            }
        );
    }
};

// exports.followRequestHandler = (req, res) => {
//     let user = req.profile;
//     let { accept } = req.body;
//     let anotherUser = req.anotherProfile;

//     let { followings, followRequestSent } = anotherUser;
//     let { followers, followRequestPending } = user;

//     let followRequestSentUpdated, followRequestPendingUpdated;
//     let followingsUpdated, followersUpdated;

//     if (followRequestPending.length === 0) {
//         return res.status(400).json({
//             message: 'No Request',
//         });
//     } else if (accept === 'yes') {
//         followersUpdated = [...followers, anotherUser._id];
//         followingsUpdated = [...followings, user._id];
//         followRequestPendingUpdated = followRequestPending.filter(
//             (id) => id === anotherUser._id
//         );
//         followRequestSentUpdated = followRequestSent.filter(
//             (id) => id === user._id
//         );
//         User.bulkWrite(
//             [
//                 {
//                     updateMany: {
//                         filter: { _id: anotherUser._id },
//                         update: {
//                             followRequestSent: followRequestSentUpdated,
//                             followings: followingsUpdated,
//                         },
//                     },
//                 },
//                 {
//                     updateMany: {
//                         filter: { _id: user._id },
//                         update: {
//                             followRequestPending: followRequestPendingUpdated,
//                             followers: followersUpdated,
//                         },
//                     },
//                 },
//             ],
//             {},
//             (err, users) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: err,
//                     });
//                 }
//                 return res.status(201).json({
//                     message: 'Follow Request Updated',
//                 });
//             }
//         );
//     } else if (accept === 'no') {
//         User.bulkWrite(
//             [
//                 {
//                     updateOne: {
//                         filter: { _id: user._id },
//                         update: { followRequestSent: followRequestSentUpdated },
//                     },
//                 },
//                 {
//                     updateOne: {
//                         filter: { _id: anotherUser._id },
//                         update: {
//                             followRequestPending: followRequestPendingUpdated,
//                         },
//                     },
//                 },
//             ],
//             {},
//             (err, users) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: err,
//                     });
//                 }
//                 return res.status(201).json({
//                     message: 'Follow Request Updated',
//                 });
//             }
//         );
//     }
// };

exports.followRequestHandler = (req, res) => {
    let { accept } = req.body;
    if (accept === 'yes') {
        User.bulkWrite(
            [
                {
                    updateMany: {
                        filter: { _id: anotherUser._id },
                        update: {
                            $push: {},
                        },
                    },
                },
                {
                    updateMany: {
                        filter: { _id: user._id },
                        update: {},
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
                    message: 'Follow Request Updated',
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
