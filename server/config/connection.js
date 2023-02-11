const mongoose = require("mongoose");

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/my-school",
//   {
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my-school",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
