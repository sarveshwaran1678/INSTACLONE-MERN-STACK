const User = require('../models/user');

const Post = require('../models/post');

const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var cloudinary = require('cloudinary').v2;

exports.getPictureById = (req, res, next, id) => {
    Post.findById(id)
        .populate('user')
        .exec((err, picture) => {
            if (err) {
                return res.status(400).json({
                    error: 'Picture not found',
                });
            }
            req.picture = picture;
            next();
        });
};

exports.getAnotherPictureById = (req, res, next, id) => {
    Post.findById(id)
        .populate('user')
        .exec((err, picture) => {
            if (err) {
                return res.status(400).json({
                    error: 'Picture not found',
                });
            }
            req.anotherPicture = picture;
            next();
        });
};

exports.getPicture = (req, res) => {
    return res.json(req.picture);
};

exports.getAnotherUserPicture = (req, res) => {
    return res.json(req.anotherPicture);
};

//Uploading Post
exports.uploadPost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, function (error, fields, file) {
        const path = file.picturePath.path;
        const uniqueFilename = uuidv4();
        const picture = new Post(fields);

        if (
            path.match(/\.(jpg|jpeg|png)$/) &&
            file.picturePath.size < 5000000
        ) {
            cloudinary.uploader.upload(
                path,
                {
                    public_id: `InstaClone/${uniqueFilename}`,
                    tags: `InstaClone`,
                }, // directory and tags are optional

                function (err, image) {
                    if (err) return res.send(err);
                    console.log('file uploaded to Cloudinary');
                    picture.UserId = req.profile._id;
                    picture.picturePath = image.public_id;
                    picture.pictureUrl = image.url;
                    picture.save((err, picture) => {
                        if (err) {
                            res.status(400).json({
                                error: err,
                            });
                        }
                        return res.json(picture);
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

//Deleting Post
exports.removePicture = (req, res, next) => {
    if (toString(req.profile._id) == toString(req.picture.UserId)) {
        let picture = req.picture;
        cloudinary.uploader.destroy(picture.picturePath, function (result) {});
        picture.remove((err, deletedpicture) => {
            if (err) {
                return res.status(400).json({
                    error: 'Failed to delete picture',
                });
            }
            next();
        });
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove comment',
        });
    }
};

//Update the Picture Caption
exports.updateCaption = (req, res) => {
    if (toString(req.profile._id) == toString(req.picture.UserId)) {
        Post.findByIdAndUpdate(
            { _id: req.picture._id },
            { $set: req.body }, //req.body will have values from frontend to be updated
            { new: true, runValidators: true },
            (err, picture) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                res.json(picture);
            }
        );
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove comment',
        });
    }
};

//Like and Unlike
exports.likePicture = (req, res) => {
    let user = req.profile;
    let picture = req.picture;
    const username = user.username;
    if (picture.likesFromUserId.includes(user._id)) {
        Post.findByIdAndUpdate(
            { _id: req.picture._id },
            { $pull: { likesFromUserId: req.profile._id } },
            { new: true, useFindAndModify: false },
            (err, picture) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                res.json({
                    message: 'Post wad unliked by: ' + username,
                    picture: picture,
                });
            }
        );
    } else {
        let { _id, username } = req.profile;
        const pushNotification = {
            _id,
            updatedFieldName: username + ' liked your photo',
        };
        //Logic for like
        Post.findByIdAndUpdate(
            { _id: req.picture._id },
            { $push: { likesFromUserId: req.profile._id } },
            { new: true, useFindAndModify: false },
            (err, picture) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                //Notification Logic
                User.findByIdAndUpdate(
                    { _id: req.picture.UserId },
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
                res.json({
                    message: 'Post wad liked by: ' + username,
                    picture: picture,
                });
            }
        );
    }
};

//Uploading Story
exports.uploadStory = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, function (error, fields, file) {
        const path = file.picturePath.path;
        const uniqueFilename = uuidv4();
        const picture = new Post(fields);

        if (
            path.match(/\.(jpg|jpeg|png)$/) &&
            file.picturePath.size < 5000000
        ) {
            cloudinary.uploader.upload(
                path,
                {
                    public_id: `InstaClone/${uniqueFilename}`,
                    tags: `InstaClone`,
                }, // directory and tags are optional

                async function (err, image) {
                    if (err) return res.send(err);
                    console.log('file uploaded to Cloudinary');
                    picture.isStory = true;
                    picture.UserId = req.profile._id;
                    picture.picturePath = image.public_id;
                    picture.pictureUrl = image.url;
                    await picture.save((err, picture) => {
                        if (err) {
                            return res.status(400).json({
                                error: err,
                            });
                        }
                        res.json(picture);
                    });

                    //delay for deleting story
                    setTimeout(
                        () =>
                            picture.remove((err, deletedpicture) => {
                                if (err) {
                                    console.log('failed');
                                }
                                console.log(deletedpicture);
                                cloudinary.uploader.destroy(
                                    deletedpicture.picturePath,
                                    function (result) {
                                        console.log('deleted from cloud');
                                    }
                                );
                            }),
                        120000
                    );
                }
            );
        } else {
            return res.json({
                error: 'Invalid File Type',
            });
        }
    });
};
