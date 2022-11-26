const mongoose = require("mongoose");

const { Schema } = mongoose;

const gradeSchema = new Schema({
  gradeName: {
    type: String,
    required: true,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;