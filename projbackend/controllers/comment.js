const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getCommentById = (req, res, next, id) => {
    Comment.findById(id).exec((err, comment) => {
        if (err) {
            return res.status(400).json({
                error: 'Picture not found',
            });
        }
        req.comment = comment;
        next();
    });
};

exports.createComment = (req, res) => {
    const comment = new Comment(req.body);
    comment.PostId = req.picture._id;
    comment.UserId = req.profile._id;
    comment.save((err, comment) => {
        if (err) {
            return res.status(500).send({
                error: err,
            });
        }
        return res.json(comment);
    });
};

exports.getAllCommentsByPost = (req, res) => {
    Comment.find({ PostId: req.picture._id })
        .populate('UserId', 'username')
        .limit(8)
        .exec((err, comments) => {
            if (err) {
                return res.status.json({
                    error: 'No product found',
                });
            }
            res.json(comments);
        });
};

exports.getAllCommentsByUser = (req, res) => {
    Comment.find({ UserId: req.profile._id })
        .populate('PostId', 'picturePath')
        .limit(10)
        .exec((err, comments) => {
            if (err) {
                return res.status.json({
                    error: 'No product found',
                });
            }
            res.json(comments);
        });
};

exports.updateComment = (req, res) => {
    if (req.profile._id === req.comment.UserId) {
        Comment.findByIdAndUpdate(
            req.comment._id,
            { commentBody: req.body.commentBody },
            { new: true, runValidators: true },
            (err, comment) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                }
                res.json(comment);
            }
        );
    } else {
        return res.status(400).json({
            err: 'Not authorized to update comment',
        });
    }
};

exports.removeUserComment = (req, res) => {
    if (req.profile._id === req.comment.UserId) {
        Comment.findByIdAndDelete(req.comment._id, (err, comment) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            }
            res.json(comment);
        });
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove comment',
        });
    }
};

exports.removePostComment = (req, res) => {
    if (
        req.profile._id === req.picture.userId &&
        req.picture._id === req.comment.PostId
    ) {
        Comment.findByIdAndDelete(req.comment._id, (err, comment) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            }
            res.json(comment);
        });
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove comment',
        });
    }
};
