const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
    {
        UserId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        PostId: {
            type: ObjectId,
            ref: 'Post',
            required: true,
        },
        commentBody: {
            type: String,
            trim: true,
            maxLength: 100,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
