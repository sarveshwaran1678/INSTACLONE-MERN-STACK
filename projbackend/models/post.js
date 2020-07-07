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
        likesFromUserId: {
            type: Array,
            default: [],
        },
        caption: {
            type: String,
            maxLength: 100,
            trim: true,
        },
        pictureUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
