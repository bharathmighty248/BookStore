"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var bookSchema = new _mongoose.Schema({
  productImage: {
    type: Object
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "default": "Available"
  }
});

var _default = (0, _mongoose.model)('book', bookSchema);

exports["default"] = _default;