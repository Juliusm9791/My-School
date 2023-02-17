const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        type: {
            type: String,
            enum: ["Comment", "Like"],
            required: true
        },
        isRead: {
            type: Boolean,
            default: false,
            required: true
        },
        referPost: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;