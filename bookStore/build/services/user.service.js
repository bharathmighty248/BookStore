"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.register = exports.login = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _resetcode = _interopRequireDefault(require("../models/resetcode.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user2 = require("../utils/user.util");

//Register new Admin or User
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    var userPresent, hash, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find({
              email: info.email
            });

          case 2:
            userPresent = _context.sent;

            if (!(userPresent.length === 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 6;
            return _bcryptjs["default"].hash(info.password, 10);

          case 6:
            hash = _context.sent;
            info.password = hash;
            _context.next = 10;
            return _user["default"].create(info);

          case 10:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 14:
            return _context.abrupt("return", null);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}(); //Login Admin or User


exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var userPresent, match, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: info.email
            });

          case 2:
            userPresent = _context2.sent;

            if (!userPresent) {
              _context2.next = 15;
              break;
            }

            _context2.next = 6;
            return _bcryptjs["default"].compare(info.password, userPresent.password);

          case 6:
            match = _context2.sent;

            if (!match) {
              _context2.next = 12;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              email: userPresent.email,
              id: userPresent._id,
              role: userPresent.role
            }, process.env.SECRET_KEY);
            return _context2.abrupt("return", token);

          case 12:
            return _context2.abrupt("return", "Incorrect Password");

          case 13:
            _context2.next = 16;
            break;

          case 15:
            return _context2.abrupt("return", "Not Registered Yet");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //ForgotPassword for Admin or User


exports.login = login;

var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(info) {
    var userPresent;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              email: info.email
            });

          case 2:
            userPresent = _context3.sent;

            if (!userPresent) {
              _context3.next = 8;
              break;
            }

            (0, _user2.sendResetEmail)(userPresent.email);
            return _context3.abrupt("return", true);

          case 8:
            return _context3.abrupt("return", "Not Registered Yet");

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgotPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); //ResetPassword for Admin or User


exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(info) {
    var codePresent, hash;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _resetcode["default"].findOne({
              email: info.email,
              resetcode: info.resetcode
            });

          case 2:
            codePresent = _context4.sent;

            if (!codePresent) {
              _context4.next = 13;
              break;
            }

            _context4.next = 6;
            return _bcryptjs["default"].hash(info.newPassword, 10);

          case 6:
            hash = _context4.sent;
            _context4.next = 9;
            return _user["default"].findOneAndUpdate({
              email: codePresent.email
            }, {
              password: hash
            }, {
              "new": true
            });

          case 9:
            (0, _user2.sendSuccessEmail)(codePresent.email);
            return _context4.abrupt("return", true);

          case 13:
            return _context4.abrupt("return", "code expired");

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;