const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const replySchema = new mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: 'User',
    },
    CommentId: {
        type: ObjectId,
        ref: "Comment"
    },
    replyBody: {
        type: String,
        trim: true,
        maxLength: 100,
    },
}, { timestamps: true })

module.exports = mongoose.model('Reply', replySchema);
