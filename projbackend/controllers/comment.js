const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Reply = require('../models/reply');
const { result } = require('lodash');
const { check } = require('express-validator');

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
                return res.status(500).json({
                    error: 'No comment found',
                });
            }
            res.json(comments);
        });
};

exports.getAllCommentsByUser = (req, res) => {
    console.log('hit');
    Comment.find({ UserId: req.profile._id })
        .populate('PostId', 'picturePath')
        .limit(10)
        //Add skip count *10
        .exec((err, comments) => {
            if (err) {
                return res.status(500).json({
                    error: 'No comment found',
                });
            }
            res.status(400).json(comments);
        });
};

exports.updateComment = (req, res) => {
    if (toString(req.profile._id) == toString(req.comment.UserId)) {
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
            err: 'Not authorized to remove comment',
        });
    }
};

exports.removeUserComment = (req, res, next) => {
    if (toString(req.profile._id) == toString(req.comment.UserId)) {
        Comment.findByIdAndDelete(req.comment._id, (err, comment) => {
            if (err) {
                return res.status(500).json({
                    error: err,
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

exports.removePostComment = (req, res, next) => {
    if (toString(req.profile._id) === toString(req.picture.userId)) {
        Comment.findByIdAndDelete(req.comment._id, (err, comment) => {
            if (err) {
                return res.status(500).json({
                    error: err,
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

exports.getReplyById = (req, res, next, id) => {
    Reply.findById(id).exec((err, reply) => {
        if (err) {
            return res.status(400).json({
                error: 'Picture not found',
            });
        }
        req.reply = reply;
        next();
    });
};

exports.createReply = (req, res) => {
    const reply = new Reply(req.body);
    reply.CommentId = req.comment._id;
    reply.UserId = req.profile._id;
    reply.save((err, reply) => {
        if (err) {
            return res.status(500).send({
                error: err,
            });
        }
        return res.json(reply);
    });
};

exports.getAllReplyByUser = (req, res) => {
    Reply.find({ UserId: req.profile._id })
        .populate('CommentId', 'UserId commentBody')
        .populate('UserId', 'username')
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

exports.getAllReplyByCommentId = (req, res) => {
    Reply.find({ CommentId: req.comment })
        .then((replies) => {
            return res.status(201).json({ replies })

        })
        .catch((err) => {
            return res.status(500).json({ error: err })
        })
}

exports.updateReply = (req, res) => {
    if (toString(req.profile._id) == toString(req.reply.UserId)) {
        Reply.findByIdAndUpdate(
            req.reply._id,
            { replyBody: req.body.replyBody },
            { new: true, runValidators: true },
            (err, reply) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                }
                res.json(reply);
            }
        );
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove reply',
        });
    }
};

exports.removeUserReply = (req, res) => {
    if (toString(req.profile._id) == toString(req.reply.UserId)) {
        Reply.findByIdAndDelete(req.reply._id, (err, reply) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            }
            res.json({
                msg: 'Reply Deleted Successfully',
            });
        });
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove reply',
        });
    }
};

exports.removeCommentReply = (req, res) => {
    if (toString(req.profile._id) == toString(req.comment.UserId)) {
        Reply.findByIdAndDelete(req.reply._id, (err, reply) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            }
            res.json({
                msg: 'Reply Deleted Successfully On Your Comment',
            });
        });
    } else {
        return res.status(400).json({
            err: 'Not authorized to remove comment',
        });
    }
};

exports.removeReplies = (req, res) => {
    Reply.deleteMany({ CommentId: req.comment._id }, (err) => {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        return res.json({
            message: 'Comment with Replies deleted Successfully',
        });
    });
};

exports.removeAllCommentWithReply = async (req, res) => {
    let resValue;
    let comments = [];
    await Comment.find({ PostId: req.picture._id })
        .then((result) => {
            comments = [...result];
            // console.log(result);
        })
        .catch((e) => console.log(e));
    // console.log(comments);
    await comments.map((commentObj) => {
        Comment.findByIdAndDelete(commentObj._id, (err, comment) => {
            if (err) {
                resValue = 'error';
                return;
            }
        });

        Reply.deleteMany({ CommentId: commentObj._id }, (err) => {
            if (err) {
                resValue = 'error';
                return;
            }
        });
    });

    if (resValue == 'error')
        return res.status(500).json({
            error: 'Something went wrong',
        });
    else
        return res.status(200).json({
            message: 'Succesfully deleted all comments and reply',
        });
};
