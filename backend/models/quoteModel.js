const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    fav: {
      type: Boolean,
      default: false,
    },
    ease: {
      type: Number,
      default: 2.5,
    },
    daysPracticed: {
      type: Number,
      default: 0,
    },
    graduated: {
      type: Boolean,
      default: false,
    },
    currentInterval: {
      type: Number,
      default: 10,
    },
    whenToShow: {
      type: Date,
      default: Date.now,
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
