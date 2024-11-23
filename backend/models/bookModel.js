const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bookImg: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  tags: {
    type: String,
  },

  fav: {
    type: Boolean,
    default: true,
  },
  isFinishedReading: {
    type: Boolean,
    default: false,
  },
  quote: {
    type: [Schema.Types.ObjectId],
    ref: "Quote",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

bookSchema.index({ title: 1, user: 1 }, { unique: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
