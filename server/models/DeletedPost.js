const mongoose = require("mongoose");

const { Schema } = mongoose;

const deletedPostSchema = new Schema(
  {
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
      required: true,
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

const DeletedPost = mongoose.model("DeletedPost", deletedPostSchema);

module.exports = DeletedPost;
