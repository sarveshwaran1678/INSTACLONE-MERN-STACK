const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pictureSchema = new mongoose.Schema(
    {
        picturePath: {
            type: String,
            default: '',
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
            minLength: 5,
            validate(value) {
                if (value.length < 5) {
                    throw new Error('SIze Should be more than 5 char');
                }
            },
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Picture', pictureSchema);
