const mongoose = require("mongoose");

const { Schema } = mongoose;

const reactionSchema = new Schema({
  noLike: {
    type: Boolean,
    required: false,
  },
  like: {
    type: Boolean,
    required: false,
  },
   userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
