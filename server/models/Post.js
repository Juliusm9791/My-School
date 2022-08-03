const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
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
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
