const User = require("../models/user")
const Comment = require("../models/comment")
const Picture = require("../models/picture")
const Reply = require("../models/comment")

const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.getPictureById = (req, res, next, id) => {
    Picture.findById(id)
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
    Picture.findById(id)
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

exports.uploadPicture = (req, res, next) => {
    let photoName = uuidv4();
    let photoPath = '/assets/' + photoName + '.png';
    let picture = req.picture;

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
            picture.picturePath = photoPath;
        } else {
            picture.picturePath = null;
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
        let picture = req.picture;
        picture = _.extend(picture, fields);

        if (picture.picturePath === null) {
            res.status(400).json({
                error: 'Upload Valid Image',
            });
        } else if (picture.picturePath !== null) {
            picture.save((err, picture) => {
                if (err) {
                    res.status(400).json({
                        error: 'Updation of picture failed',
                    });
                }
                res.json(picture);
            });
        }
    });
    console.log('Done');
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
            picture: deletedpicture,
        });
    });
};

exports.likePicture = (req, res) => {
    let user = req.profile;
    let picture = req.picture;
    let { likesFromUserId } = picture;
    if (likesFromUserId.includes(user._id)) {
        likesFromUserId = likesFromUserId.filter((id) => id === user._id);
    } else {
        likesFromUserId = [...likesFromUserId, user._id];
    }
};





exports.createComment = (req, res) => {
    let comment = new Comment(req.body)
    comment.commentBody = req.body.commentBody
    comment.user = req.profile._id
    comment.picture = req.picture._id

    comment.save((err, comment) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save Comment in DB"
            })
        }
        res.json({
            _id: comment._id,
            userId: comment.user,
            pictureId: comment.picture,
            commentBody: comment.commentBody
        })
    })
}


exports.getCommentById = (req, res, next, id) => {
    Comment.findById(id)
        .populate('user')
        .exec((err, comment) => {
            if (err) {
                return res.status(400).json({
                    error: 'Picture not found',
                });
            }
            req.comment = comment;
            next();
        });
};

exports.updateComment = (req, res) => {
    let comment = new Comment(req.body)
    comment.commentBody = req.body.commentBody
    comment.user = req.profile._id
    comment.picture = req.picture._id

    comment.save((err, comment) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save Comment in DB"
            })
        }
        res.json({
            _id: comment._id,
            userId: comment.user,
            pictureId: comment.picture,
            commentBody: comment.commentBody
        })
    })
}