const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reactionId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
