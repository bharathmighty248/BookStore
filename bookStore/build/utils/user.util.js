"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSuccessEmail = exports.sendResetEmail = exports.sendOrderConfirmation = void 0;

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
/**
 * utility to sendPlaceOrder
 *
 * @param {object} details
 */


exports.sendSuccessEmail = sendSuccessEmail;

var sendOrderConfirmation = function sendOrderConfirmation(details) {
  transporter.sendMail({
    from: "'Book-Store'<bookstore-account@bookstore.com>",
    to: details.email,
    subject: "Order confirmation",
    text: "Hello Happy Customer,\n        Thank you for shoping with us. Your order is placed successfully.\n        order Details:\n                        Email: ".concat(details.email, "\n                        Delivary address: ").concat(details.address, "\n                        Payment mode: ").concat(details.paymentMode, "\n                        ordered item(s): ").concat(details.books, "\n                        Order Total: Rs.").concat(details.totalAmount, ".00\n\n        We hope to see you again soon.\n        BOOKSTORE.In\n        ")
  });
};

exports.sendOrderConfirmation = sendOrderConfirmation;