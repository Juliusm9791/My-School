const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    isVisible: {
      type: Boolean,
      default: false,
    },
    isEvent: {
      type: Boolean,
      required: true,
      default: false,
    },
    eventDate: {
      type: Date,
      required: false,
    },
    eventEndDate: {
      type: Date,
      required: false,
    },
    eventLocation: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pictures: {
      type: String,
      required: false,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reactionId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
