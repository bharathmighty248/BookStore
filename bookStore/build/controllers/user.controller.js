"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.register = exports.login = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var UserService = _interopRequireWildcard(require("../services/user.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Controller to Register Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            info = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password,
              role: req.body.role
            };
            _context.next = 4;
            return UserService.register(info);

          case 4:
            data = _context.sent;

            if (data) {
              res.status(_httpStatusCodes["default"].CREATED).json({
                code: _httpStatusCodes["default"].CREATED,
                message: 'Registration successfull',
                data: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  role: data.role
                }
              });
            } else {
              res.status(_httpStatusCodes["default"].CONFLICT).json({
                code: _httpStatusCodes["default"].CONFLICT,
                message: 'Email Already Exist'
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to Login Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            info = {
              email: req.body.email,
              password: req.body.password
            };
            _context2.next = 4;
            return UserService.login(info);

          case 4:
            data = _context2.sent;

            if (data == "Not Registered Yet") {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Not Registered Yet'
              });
            } else if (data == "Incorrect Password") {
              res.status(_httpStatusCodes["default"].UNAUTHORIZED).json({
                code: _httpStatusCodes["default"].UNAUTHORIZED,
                message: 'Incorrect Password'
              });
            } else {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Login Successful',
                token: data
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Controller to ForgotPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.login = login;

var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            info = {
              email: req.body.email
            };
            _context3.next = 4;
            return UserService.forgotPassword(info);

          case 4:
            data = _context3.sent;

            if (data == "Not Registered Yet") {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Not Registered Yet'
              });
            } else {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Reset-code Sent to your Email'
              });
            }

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function forgotPassword(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Controller to ResetPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            info = {
              email: req.body.email,
              newPassword: req.body.newPassword,
              resetcode: req.body.resetcode
            };
            _context4.next = 4;
            return UserService.resetPassword(info);

          case 4:
            data = _context4.sent;

            if (data == "code expired") {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Reset-code is expired, Request new Reset-code'
              });
            } else {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Password reset successfull'
              });
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function resetPassword(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;