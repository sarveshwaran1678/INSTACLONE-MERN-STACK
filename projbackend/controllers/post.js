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

exports.createPicture = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, function (error, fields, file) {
        const path = file.picturePath.path;
        const uniqueFilename = uuidv4();
        const picture = new Post(fields);
        console.log(picture);
        console.log(path);
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

                    picture.picturePath = image.public_id;
                    picture.pictureUrl = image.url;
                    // console.log(user);
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

exports.removePicture = (req, res) => {
    if (toString(req.profile._id) == toString(req.picture.UserId)) {
        let picture = req.picture;
        cloudinary.uploader.destroy(picture.picturePath, function (result) {
            console.log(result);
        });
        picture.remove((err, deletedpicture) => {
            if (err) {
                return res.status(400).json({
                    error: 'Failed to delete picture',
                });
            }
            res.json({
                message: 'Delete was successful',
            });
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
                res.json(picture);
            }
        );
    } else {
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
                res.json(picture);
            }
        );
    }
};
