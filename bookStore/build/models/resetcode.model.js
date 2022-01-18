"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var codeSchema = new _mongoose.Schema({
  email: {
    type: String
  },
  resetcode: {
    type: String
  },
  expireAt: {
    type: Date,
    "default": Date.now,
    index: {
      expireAfterSeconds: 180
    }
  }
});

var _default = (0, _mongoose.model)('resetcode', codeSchema);

exports["default"] = _default;