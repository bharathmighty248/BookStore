"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatebook = exports.getallbooks = exports.deletebook = exports.addbook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _book = _interopRequireDefault(require("../models/book.model"));

//Add book 
var addbook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book["default"].create(info);

          case 3:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function addbook(_x) {
    return _ref.apply(this, arguments);
  };
}(); //Get all books 


exports.addbook = addbook;

var getallbooks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _book["default"].find();

          case 3:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getallbooks() {
    return _ref2.apply(this, arguments);
  };
}(); //Update book 


exports.getallbooks = getallbooks;

var updatebook = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(info) {
    var book;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _book["default"].findById(info.bookId);

          case 3:
            book = _context3.sent;

            if (!(book != null)) {
              _context3.next = 23;
              break;
            }

            if (!(info.title !== undefined)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 8;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              title: info.title
            });

          case 8:
            if (!(info.description !== undefined)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 11;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              description: info.description
            });

          case 11:
            if (!(info.author !== undefined)) {
              _context3.next = 14;
              break;
            }

            _context3.next = 14;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              author: info.author
            });

          case 14:
            if (!(info.quantity !== undefined)) {
              _context3.next = 17;
              break;
            }

            _context3.next = 17;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: info.quantity
            });

          case 17:
            if (!(info.price !== undefined)) {
              _context3.next = 20;
              break;
            }

            _context3.next = 20;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              price: info.price
            });

          case 20:
            return _context3.abrupt("return", true);

          case 23:
            return _context3.abrupt("return", "Book Not Found");

          case 24:
            _context3.next = 29;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 26]]);
  }));

  return function updatebook(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); //Delete book 


exports.updatebook = updatebook;

var deletebook = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(info) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _book["default"].findByIdAndRemove(info);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", _context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function deletebook(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deletebook = deletebook;