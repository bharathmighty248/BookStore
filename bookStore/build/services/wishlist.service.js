"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.mywishlist = exports.add = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _wishlist = _interopRequireDefault(require("../models/wishlist.model"));

var _book = _interopRequireDefault(require("../models/book.model"));

//Add To Wishlist
var add = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    var bookpresent, userwishlist, book, newbook, wishlist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book["default"].findOne({
              _id: info.bookId
            });

          case 3:
            bookpresent = _context.sent;

            if (!bookpresent) {
              _context.next = 27;
              break;
            }

            _context.next = 7;
            return _wishlist["default"].findOne({
              userId: info.userId
            });

          case 7:
            userwishlist = _context.sent;

            if (!userwishlist) {
              _context.next = 22;
              break;
            }

            _context.next = 11;
            return _wishlist["default"].findOne({
              userId: info.userId,
              "books.bookId": info.bookId
            });

          case 11:
            book = _context.sent;

            if (!book) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", "Already added");

          case 16:
            newbook = {
              bookId: info.bookId,
              author: bookpresent.author,
              title: bookpresent.title,
              price: bookpresent.price
            };
            _context.next = 19;
            return _wishlist["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              $addToSet: {
                books: newbook
              }
            });

          case 19:
            return _context.abrupt("return", true);

          case 20:
            _context.next = 25;
            break;

          case 22:
            wishlist = new _wishlist["default"]({
              userId: info.userId,
              books: [{
                bookId: info.bookId,
                author: bookpresent.author,
                title: bookpresent.title,
                price: bookpresent.price
              }]
            });
            wishlist.save();
            return _context.abrupt("return", true);

          case 25:
            _context.next = 28;
            break;

          case 27:
            return _context.abrupt("return", false);

          case 28:
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 30]]);
  }));

  return function add(_x) {
    return _ref.apply(this, arguments);
  };
}(); //Remove from Wishlist


exports.add = add;

var remove = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var userwishlist, book;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _wishlist["default"].findOne({
              userId: info.userId
            });

          case 3:
            userwishlist = _context2.sent;

            if (!userwishlist) {
              _context2.next = 19;
              break;
            }

            _context2.next = 7;
            return _wishlist["default"].findOne({
              userId: info.userId,
              "books.bookId": info.bookId
            });

          case 7:
            book = _context2.sent;

            if (!book) {
              _context2.next = 16;
              break;
            }

            _context2.next = 11;
            return _wishlist["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              $pull: {
                books: {
                  bookId: info.bookId
                }
              }
            });

          case 11:
            _context2.next = 13;
            return _wishlist["default"].findOneAndDelete({
              userId: info.userId,
              books: {
                $exists: true,
                $size: 0
              }
            });

          case 13:
            return _context2.abrupt("return", true);

          case 16:
            return _context2.abrupt("return", "Not found");

          case 17:
            _context2.next = 20;
            break;

          case 19:
            return _context2.abrupt("return", false);

          case 20:
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 22]]);
  }));

  return function remove(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //My Wishlist


exports.remove = remove;

var mywishlist = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(info) {
    var userwishlist;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _wishlist["default"].findOne({
              userId: info.userId
            });

          case 3:
            userwishlist = _context3.sent;

            if (!userwishlist) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", userwishlist);

          case 8:
            return _context3.abrupt("return", false);

          case 9:
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function mywishlist(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.mywishlist = mywishlist;