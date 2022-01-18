"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.resetPassword = exports.register = exports.login = exports.getUser = exports.getAllUsers = exports.forgotPassword = exports.deleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _resetcode = _interopRequireDefault(require("../models/resetcode.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user2 = require("../utils/user.util");

//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find();

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}(); //Register new Admin or User


exports.getAllUsers = getAllUsers;

var register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var userPresent, hash, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].find({
              email: info.email
            });

          case 2:
            userPresent = _context2.sent;

            if (!(userPresent.length === 0)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 6;
            return _bcryptjs["default"].hash(info.password, 10);

          case 6:
            hash = _context2.sent;
            info.password = hash;
            _context2.next = 10;
            return _user["default"].create(info);

          case 10:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 14:
            return _context2.abrupt("return", null);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function register(_x) {
    return _ref2.apply(this, arguments);
  };
}(); //Login Admin or User


exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(info) {
    var userPresent, match, token;
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
              _context3.next = 15;
              break;
            }

            _context3.next = 6;
            return _bcryptjs["default"].compare(info.password, userPresent.password);

          case 6:
            match = _context3.sent;

            if (!match) {
              _context3.next = 12;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              email: userPresent.email,
              id: userPresent._id,
              role: userPresent.role
            }, process.env.SECRET_KEY);
            return _context3.abrupt("return", token);

          case 12:
            return _context3.abrupt("return", "Incorrect Password");

          case 13:
            _context3.next = 16;
            break;

          case 15:
            return _context3.abrupt("return", "Not Registered Yet");

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function login(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); //ForgotPassword for Admin or User


exports.login = login;

var forgotPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(info) {
    var userPresent;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user["default"].findOne({
              email: info.email
            });

          case 2:
            userPresent = _context4.sent;

            if (!userPresent) {
              _context4.next = 8;
              break;
            }

            (0, _user2.sendResetEmail)(userPresent.email);
            return _context4.abrupt("return", true);

          case 8:
            return _context4.abrupt("return", "Not Registered Yet");

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function forgotPassword(_x3) {
    return _ref4.apply(this, arguments);
  };
}(); //ResetPassword for Admin or User


exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(info) {
    var codePresent, hash;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _resetcode["default"].findOne({
              email: info.email,
              resetcode: info.resetcode
            });

          case 2:
            codePresent = _context5.sent;

            if (!codePresent) {
              _context5.next = 13;
              break;
            }

            _context5.next = 6;
            return _bcryptjs["default"].hash(info.newPassword, 10);

          case 6:
            hash = _context5.sent;
            _context5.next = 9;
            return _user["default"].findOneAndUpdate({
              email: codePresent.email
            }, {
              password: hash
            }, {
              "new": true
            });

          case 9:
            (0, _user2.sendSuccessEmail)(codePresent.email);
            return _context5.abrupt("return", true);

          case 13:
            return _context5.abrupt("return", "code expired");

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function resetPassword(_x4) {
    return _ref5.apply(this, arguments);
  };
}(); //update single user


exports.resetPassword = resetPassword;

var updateUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findByIdAndUpdate({
              _id: _id
            }, body, {
              "new": true
            });

          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateUser(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}(); //delete single user


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findByIdAndDelete(id);

          case 2:
            return _context7.abrupt("return", '');

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteUser(_x7) {
    return _ref7.apply(this, arguments);
  };
}(); //get single user


exports.deleteUser = deleteUser;

var getUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _user["default"].findById(id);

          case 2:
            data = _context8.sent;
            return _context8.abrupt("return", data);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getUser(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getUser = getUser;