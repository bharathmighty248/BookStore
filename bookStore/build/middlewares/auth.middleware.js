"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRole = exports.setRole = exports.auth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
var auth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bearerToken = req.header('Authorization');

            if (bearerToken) {
              _context.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 4:
            bearerToken = bearerToken.split(' ')[1];

            _jsonwebtoken["default"].verify(bearerToken, process.env.SECRET_KEY, function (error, decodedtoken) {
              if (error) {
                throw {
                  code: _httpStatusCodes["default"].UNAUTHORIZED,
                  message: 'Authorization Failed'
                };
              } else {
                req.user = decodedtoken;
                next();
              }
            });

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

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Middleware to Set Role either Admin or User
 *
 * @param {String} role
 */


exports.auth = auth;

var setRole = function setRole(role) {
  return function (req, res, next) {
    req.body.role = role;
    next();
  };
};
/**
 * Middleware to verify Role
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */


exports.setRole = setRole;

var verifyRole = function verifyRole(req, res, next) {
  if (req.user.role == 'Admin') {
    next();
  } else {
    throw {
      code: _httpStatusCodes["default"].UNAUTHORIZED,
      message: 'Only Admin Had this Permissions'
    };
  }
};

exports.verifyRole = verifyRole;