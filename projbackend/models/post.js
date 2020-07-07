const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        picturePath: {
            type: String,
            required: true,
        },
        userId: {
            type: ObjectId,
            ref: 'User',
        },
        description: {
            type: String,
            trim: true,
            maxLength: 100,
        },
        likesFromUserId: {
            type: Array,
            default: [],
        },
        caption: {
            type: String,
            maxLength: 100,
        },
        comments: [{
            fromUserId: {
                type: ObjectId,
                ref: 'User',
            },
            commentBody: {
                type: String,
                trim: true,
                maxLength: 100,
            },
            reply: [{
                fromUserId: {
                    type: ObjectId,
                    ref: 'User',
                },
                replyBody: {
                    type: String,
                    trim: true,
                    maxLength: 100,
                },
            }]
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
