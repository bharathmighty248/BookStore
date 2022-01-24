"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var wishlistSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  books: [{
    bookId: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'book',
      required: true
    },
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }]
});

var _default = (0, _mongoose.model)('mywishlist', wishlistSchema);

exports["default"] = _default;