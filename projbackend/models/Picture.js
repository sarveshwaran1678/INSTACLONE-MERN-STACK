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
    },
    { timestamps: true }
);

module.exports = mongoose.model('Picture', pictureSchema);
