const User = require('../models/user');
const formidable = require('formidable');
const _ = require('lodash');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const user = require('../models/user');

exports.getUserById = async (req, res, next, id) => {
    await User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User Not found in DB',
            });
        }
        req.profile = user;
        next();
    });
};

exports.getAnotherUserById = async (req, res, next, id) => {
    await User.findById(id, (err, user) => {
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

exports.updatePassword = async (req, res) => {
    let user = req.profile;

    let { oldPassword, newPassword } = req.body;

    if (user.authenticate(oldPassword)) {
        if (newPassword.length > 5 && newPassword.length < 15) {
            user.password = newPassword;

            await user.save((err, user) => {
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

exports.updateProfilePhoto = async (req, res) => {
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
                async function (err, image) {
                    if (err) return res.send(err);
                    console.log('file uploaded to Cloudinary');

                    user.profilePicPath = image.public_id;
                    user.pictureUrl = image.url;
                    // console.log(user);
                    await user.save((err, user) => {
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

    form.parse(req, async (err, fields, file) => {
        //updation code
        let user = req.profile;
        user = _.extend(user, fields);
        await user.save((err, user) => {
            if (err) {
                res.status(400).json({
                    error: err,
                });
            }
            res.json(user);
        });
    });
};

exports.followToggle = async (req, res) => {
    let user = req.profile;
    let anotherUser = req.anotherProfile;
    let userName = user.username;
    let anotherUserName = anotherUser.username;
    let { followings, followRequestSent } = user;
    let { followers, followRequestPending } = anotherUser;

    if (anotherUser.isPrivate) {
        if (followers.includes(user._id)) {
            await User.bulkWrite(
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
            await User.bulkWrite(
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
            await User.bulkWrite(
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

            updateAnotherNotification(
                user._id,
                userName + ' have sent Follow request',
                req
            );
        }
    } else {
        if (followers.includes(user._id)) {
            await User.bulkWrite(
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
            await User.bulkWrite(
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
                        updateMany: {
                            filter: { _id: anotherUser._id },
                            update: {
                                $push: {
                                    followers: user._id,
                                },
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
                            userName + ' started Following ' + anotherUserName,
                    });
                }
            );
            let msg = '';
            if (user.followers.includes(anotherUser._id)) {
                msg = userName + ' started Following you';
            } else {
                msg = userName + ' started Following you.Follow Back';
            }
            updateAnotherNotification(user._id, msg, req);
        }
    }
};

exports.followRequestHandler = async (req, res) => {
    let { accept } = req.body;
    let user = req.profile;
    let anotherUser = req.anotherProfile;
    let userName = user.username;
    let anotherUserName = anotherUser.username;
    if (user.followRequestPending.includes(anotherUser._id) === false) {
        return res.json({ msg: 'No request received' });
    }
    if (accept === 'yes') {
        await User.bulkWrite(
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
        updateAnotherNotification(
            user._id,
            userName + ' accepted your follow request',
            req
        );
    } else {
        await User.bulkWrite(
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

exports.updateBio = async (req, res) => {
    let user = req.profile
    user.bio = req.body.bio

    await user.save((err, user) => {
        if (err) {
            return res.status(500).json({
                error: 'DB error',
            });
        }

        return res.status(201).json({
            message: 'bio updated',
        });
    });

}

exports.toggleIsPrivate = async (req, res) => {
    let user = req.profile;

    user.isPrivate = !user.isPrivate;

    await user.save((err, user) => {
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

const updateAnotherNotification = (UserId, fieldName, req) => {
    const pushNotification = {
        UserId,
        updatedFieldName: fieldName,
    };
    User.findByIdAndUpdate(
        { _id: req.anotherProfile._id },
        { $push: { updateNotification: pushNotification } },
        { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                return res.json({
                    msg: 'error',
                });
            }
            console.log('Done');
        }
    );
};

exports.forgotPasswordMailSend = async (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).exec(async (err, foundUser) => {
        if (err) {
            return res.status(400).json({
                error: 'User Email Not Found',
            });
        }
        if (foundUser) {
            let receiverEmail = email;
            let otp = Math.floor(100000 + Math.random() * 900000) + '';

            var transporter = nodemailer.createTransport(
                smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'gfreaks303@gmail.com',
                        pass: process.env.EMAILPASSWORD,
                    },
                })
            );

            console.log(receiverEmail);
            var mailOptions = {
                from: 'gfreaks303@gmail.com',
                to: receiverEmail,
                subject: 'Reset Password',
                text: otp,
            };
            console.log(otp);
            await transporter.sendMail(mailOptions, async function (
                error,
                info
            ) {
                if (error) {
                    return res.status(500).json({
                        error: 'Email not sent',
                    });
                } else {
                    console.log('Email sent: ' + info.response);
                    await User.findOne({ email: email }).exec(
                        async (err, foundUser) => {
                            if (err) {
                                return res.status(400).json({
                                    error: 'User Email Not Found',
                                });
                            }

                            foundUser.otp = otp;
                            foundUser.otpTimeout = new Date();
                            await foundUser.save((err, user) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: err,
                                    });
                                }
                                return res.status(201).json({
                                    message: 'OTP sent successfully',
                                });
                            });
                        }
                    );
                }
            });
        } else {
            return res.json({
                msg: 'email not valid',
            });
        }
    });
};


exports.otpMatcher = async (req, res) => {
    let currentTime = Date.now();

    let userOtp = req.body.userOtp;
    let email = req.body.userEmail

    await User.findOne({ email: email }).exec(async (err, foundUser) => {
        if (err) {
            return res.status(400).json({
                error: 'User Not Found',
            });
        }
        let { otp, otpTimeout } = foundUser;
        if (currentTime - otpTimeout < 600000) {
            if (userOtp === otp) {
                foundUser.otpMatched = true;
            } else {
                console.log('Otp', otp);
                return res.status(401).json({
                    msg: "OTP didn't match!!!!",
                });
            }
        } else {
            return res.status(401).json({
                msg: 'OTP expired',
            });
        }
    })
}


exports.newPasswordSubmitted = async (req, res) => {
    let { newPassword, confirmNewPassword, email } = req.body;

    await User.findOne({ email: email }).exec(async (err, foundUser) => {
        if (err) {
            return res.status(400).json({
                error: 'User Not Found',
            });
        }
        // let { otp, otpTimeout } = foundUser;
        // if (currentTime - otpTimeout < 600000) {
        //     if (userOtp === otp) {
        if (newPassword === confirmNewPassword) {
            //Doing password validation
            if (newPassword.length < 5 || newPassword.length > 15) {
                return res.json({
                    msg: 'Password validation failed',
                });
            } else {
                foundUser.password = newPassword;
                await foundUser.save((err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Updation of password failed',
                        });
                    }
                    return res.status(201).json({
                        message: 'Password updated succesfully',
                    });
                });
            }
        } else {
            return res.status(401).json({
                msg: 'newPassword and confirmPassword are not Same',
            });
        }
    })
}
