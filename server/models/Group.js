const mongoose = require("mongoose");

const { Schema } = mongoose;

const groupSchema = new Schema({
    faculty: {
        type: Boolean,
        required: true,
        default: false,
    },
    parent: {
        type: Boolean,
        required: true,
        default: false,
    },
    faculty: {
        type: Boolean,
        required: true,
        student: false,
    },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;