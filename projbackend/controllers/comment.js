const User = require('../models/user');
const Comment = require('../models/comment');
const Picture = require('../models/picture');
const Reply = require('../models/comment');

const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.createComment = (req, res) => {
    let comment = new Comment(req.body);
    comment.commentBody = req.body.commentBody;
    comment.user = req.profile._id;
    comment.picture = req.picture._id;

    comment.save((err, comment) => {
        if (err) {
            return res.status(400).json({
                err: 'NOT able to save Comment in DB',
            });
        }
        res.json({
            _id: comment._id,
            userId: comment.user,
            pictureId: comment.picture,
            commentBody: comment.commentBody,
        });
    });
};
