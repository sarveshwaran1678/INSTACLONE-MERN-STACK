const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pictureSchema = new mongoose.Schema(
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
        likesFromOtherUserId: {
            type: Array,
            default: [],
        },
        caption: {
            type: String,
            maxLength: 100,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Picture', pictureSchema);
