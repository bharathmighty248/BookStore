"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var cartSchema = new _mongoose.Schema({
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
    quantity: {
      type: Number,
      required: true
    },
    total: {
      type: Number
    }
  }],
  totalAmount: {
    type: Number
  },
  isPurchased: {
    type: Boolean,
    "default": false
  }
});

var _default = (0, _mongoose.model)('cart', cartSchema);

exports["default"] = _default;