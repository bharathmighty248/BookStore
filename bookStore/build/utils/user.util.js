"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSuccessEmail = exports.sendResetEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _resetcode = _interopRequireDefault(require("../models/resetcode.model"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config('./.env'); // Transporter creation


var transporter = _nodemailer["default"].createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
/**
 * utility to sendResetEmail
 *
 * @param {object} details
 */


var sendResetEmail = function sendResetEmail(details) {
  var resetcode = Math.random().toString(36).substring(2, 12);
  transporter.sendMail({
    from: "'Book-Store'<bookstore-account@bookstore.com>",
    to: details,
    subject: "Your Password Reset Code",
    text: "Use this code to reset your password: ".concat(resetcode, " ")
  });
  var code = new _resetcode["default"]({
    email: details,
    resetcode: resetcode
  });
  code.save();
};
/**
 * utility to sendSuccessEmail
 *
 * @param {object} details
 */


exports.sendResetEmail = sendResetEmail;

var sendSuccessEmail = function sendSuccessEmail(details) {
  transporter.sendMail({
    from: "'Book-Store'<bookstore-account@bookstore.com>",
    to: details,
    subject: "Password reset successfull",
    text: "Your Password reset is successfull. Use this new password for future actions"
  });
};

exports.sendSuccessEmail = sendSuccessEmail;