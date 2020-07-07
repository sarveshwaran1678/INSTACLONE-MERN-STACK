const User = require('../models/user');

const Post = require('../models/post');

const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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

let picture, tempPath;
exports.uploadPicture = (req, res, next) => {
    let photoName = uuidv4();
    let photoPath = '/assets/' + photoName + '.png';

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.on('file', function (name, file, fields) {
        //Checking File Extension(only jpg/jpeg/png) and Size(upto 5mb)
        if (file.path.match(/\.(jpg|jpeg|png)$/) && file.size < 5000000) {
            Jimp.read(file.path, (err, lenna) => {
                lenna
                    .resize(300, 300) // resize
                    .quality(100) // set JPEG quality
                    .write(__dirname + '/assets/' + photoName + '.png'); // save
            });

            tempPath = photoPath;
        } else {
            tempPath = null;
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

exports.createPicture = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //updation code
        picture = new Post(fields);
        picture.picturePath = tempPath;
        picture.userId = req.profile._id;
        if (picture.picturePath === null) {
            res.status(400).json({
                error: 'Upload Valid Image',
            });
        } else if (picture.picturePath !== null) {
            picture.save((err, picture) => {
                if (err) {
                    res.status(400).json({
                        error: err,
                    });
                }
                res.json(picture);
            });
        }
    });
};

exports.removePicture = (req, res) => {
    let picture = req.picture;
    fs.unlinkSync(__dirname + picture.picturePath);
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
};

//Update the Picture Caption
exports.updateCaption = (req, res) => {
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
