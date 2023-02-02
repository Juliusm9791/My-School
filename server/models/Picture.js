const mongoose = require("mongoose");

const { Schema } = mongoose;

const pictureSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true
    }
  }
);

module.export = pictureSchema; 