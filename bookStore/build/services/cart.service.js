"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addtocart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = _interopRequireDefault(require("../models/cart.model"));

var _book = _interopRequireDefault(require("../models/book.model"));

//Add To Cart
var addtocart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    var available, usercart, cart, remainingqty, bookpresent, newbook, newcart, totalAmount, _remainingqty, oldqty, newqty, _newbook, _newcart, _totalAmount, _remainingqty2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book["default"].findOne({
              _id: info.bookId,
              status: "Available"
            });

          case 3:
            available = _context.sent;

            if (!available) {
              _context.next = 85;
              break;
            }

            _context.next = 7;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 7:
            usercart = _context.sent;

            if (usercart) {
              _context.next = 27;
              break;
            }

            if (!(available.quantity >= info.quantity)) {
              _context.next = 24;
              break;
            }

            cart = new _cart["default"]({
              userId: info.userId,
              books: [{
                bookId: info.bookId,
                quantity: info.quantity,
                total: info.quantity * available.price
              }],
              totalAmount: info.quantity * available.price
            });
            cart.save();
            remainingqty = available.quantity - info.quantity;

            if (!(remainingqty == 0)) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: remainingqty,
              status: "sold out"
            });

          case 16:
            return _context.abrupt("return", true);

          case 19:
            _context.next = 21;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: remainingqty
            });

          case 21:
            return _context.abrupt("return", true);

          case 22:
            _context.next = 25;
            break;

          case 24:
            return _context.abrupt("return", "less stock");

          case 25:
            _context.next = 83;
            break;

          case 27:
            _context.next = 29;
            return _cart["default"].findOne({
              userId: info.userId,
              "books.bookId": info.bookId
            });

          case 29:
            bookpresent = _context.sent;

            if (!(bookpresent == null)) {
              _context.next = 56;
              break;
            }

            if (!(available.quantity >= info.quantity)) {
              _context.next = 53;
              break;
            }

            newbook = {
              bookId: info.bookId,
              quantity: info.quantity,
              total: info.quantity * available.price
            };
            _context.next = 35;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              $addToSet: {
                books: newbook
              }
            });

          case 35:
            _context.next = 37;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 37:
            newcart = _context.sent;
            totalAmount = newcart.books.map(function (book) {
              return book.total;
            }).reduce(function (acc, curr) {
              return acc + curr;
            });
            _context.next = 41;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              totalAmount: totalAmount
            });

          case 41:
            _remainingqty = available.quantity - info.quantity;

            if (!(_remainingqty == 0)) {
              _context.next = 48;
              break;
            }

            _context.next = 45;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: _remainingqty,
              status: "sold out"
            });

          case 45:
            return _context.abrupt("return", true);

          case 48:
            _context.next = 50;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: _remainingqty
            });

          case 50:
            return _context.abrupt("return", true);

          case 51:
            _context.next = 54;
            break;

          case 53:
            return _context.abrupt("return", "less stock");

          case 54:
            _context.next = 83;
            break;

          case 56:
            if (!(available.quantity >= info.quantity)) {
              _context.next = 82;
              break;
            }

            oldqty = bookpresent.books.filter(function (book) {
              return book.bookId == info.bookId;
            })[0].quantity;
            newqty = oldqty + info.quantity;
            _context.next = 61;
            return _cart["default"].updateOne({
              userId: info.userId
            }, {
              $pull: {
                books: {
                  bookId: info.bookId
                }
              }
            });

          case 61:
            _newbook = {
              bookId: info.bookId,
              quantity: newqty,
              total: newqty * available.price
            };
            _context.next = 64;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              $addToSet: {
                books: _newbook
              }
            });

          case 64:
            _context.next = 66;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 66:
            _newcart = _context.sent;
            _totalAmount = _newcart.books.map(function (book) {
              return book.total;
            }).reduce(function (acc, curr) {
              return acc + curr;
            });
            _context.next = 70;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              totalAmount: _totalAmount
            });

          case 70:
            _remainingqty2 = available.quantity - info.quantity;

            if (!(_remainingqty2 == 0)) {
              _context.next = 77;
              break;
            }

            _context.next = 74;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: _remainingqty2,
              status: "sold out"
            });

          case 74:
            return _context.abrupt("return", true);

          case 77:
            _context.next = 79;
            return _book["default"].findOneAndUpdate({
              _id: info.bookId
            }, {
              quantity: _remainingqty2
            });

          case 79:
            return _context.abrupt("return", true);

          case 80:
            _context.next = 83;
            break;

          case 82:
            return _context.abrupt("return", "less stock");

          case 83:
            _context.next = 86;
            break;

          case 85:
            return _context.abrupt("return", "Sold Out");

          case 86:
            _context.next = 91;
            break;

          case 88:
            _context.prev = 88;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 91:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 88]]);
  }));

  return function addtocart(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addtocart = addtocart;