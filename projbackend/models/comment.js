const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

//Comment table
const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',
        },
        picture: {
            type: ObjectId,
            ref: 'Picture',
        },
        commentBody: {
            type: 'String',
            trim: true,
            required: true,
            maxlength: 100,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

//Reply table
const ReplySchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',
        },
        comment: {
            type: ObjectId,
            ref: 'Comment',
        },
        replyBody: {
            type: 'String',
            maxlength: 50,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = { Reply, Comment };
