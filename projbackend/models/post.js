const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    picturePath: {
      type: String,
      required: true,
    },
    UserId: {
      type: ObjectId,
      ref: "User",
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
    filter: {
      type: String,
      default: "Original",
    },
    pictureUrl: {
      type: String,
      required: true,
    },
    isStory: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
