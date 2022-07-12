const mongoose = require("mongoose");

const { Schema } = mongoose;

const departmentSchema = new Schema({
  depName: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
