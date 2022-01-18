"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var Validator = function Validator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(4).required().pattern(new RegExp('^[A-Za-z]{1}[a-z]{1,}$')),
    lastName: _joi["default"].string().min(4).required().pattern(new RegExp('^[A-Za-z]{1}[a-z]{1,}$')),
    email: _joi["default"].string().required().pattern(new RegExp('[a-zA-Z]+[+_.-]{0,1}[0-9a-zA-Z]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')),
    password: _joi["default"].string().required().pattern(new RegExp('[A-Za-z]{3,}[$&=?@#|*%!]{1,}[0-9]{1,}')),
    role: _joi["default"].string()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.Validator = Validator;