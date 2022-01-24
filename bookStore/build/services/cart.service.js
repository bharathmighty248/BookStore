"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewcart = exports.removefromcart = exports.placeorder = exports.addtocart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = _interopRequireDefault(require("../models/cart.model"));

var _book = _interopRequireDefault(require("../models/book.model"));

var _user = require("../utils/user.util");

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
}(); //Remove From Cart


exports.addtocart = addtocart;

var removefromcart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var usercart, bookpresent, oldqty, newcart, totalAmount, available, newqty, newbook, _newcart2, _totalAmount2, _oldqty, _newcart3, _totalAmount3;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 3:
            usercart = _context2.sent;

            if (!usercart) {
              _context2.next = 62;
              break;
            }

            _context2.next = 7;
            return _cart["default"].findOne({
              userId: info.userId,
              "books.bookId": info.bookId
            });

          case 7:
            bookpresent = _context2.sent;

            if (!bookpresent) {
              _context2.next = 59;
              break;
            }

            if (!(info.bookId && info.quantity !== undefined)) {
              _context2.next = 45;
              break;
            }

            oldqty = bookpresent.books.filter(function (book) {
              return book.bookId == info.bookId;
            })[0].quantity;

            if (!(info.quantity >= oldqty)) {
              _context2.next = 25;
              break;
            }

            _context2.next = 14;
            return _cart["default"].updateOne({
              userId: info.userId
            }, {
              $pull: {
                books: {
                  bookId: info.bookId
                }
              }
            });

          case 14:
            _context2.next = 16;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 16:
            newcart = _context2.sent;
            totalAmount = newcart.books.map(function (book) {
              return book.total;
            }).reduce(function (acc, curr) {
              return acc + curr;
            }, 0);
            _context2.next = 20;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              totalAmount: totalAmount
            });

          case 20:
            _context2.next = 22;
            return _book["default"].updateOne({
              _id: info.bookId
            }, {
              $inc: {
                quantity: oldqty
              },
              status: "Available"
            });

          case 22:
            return _context2.abrupt("return", true);

          case 25:
            _context2.next = 27;
            return _book["default"].findOne({
              _id: info.bookId
            });

          case 27:
            available = _context2.sent;
            newqty = oldqty - info.quantity;
            _context2.next = 31;
            return _cart["default"].updateOne({
              userId: info.userId
            }, {
              $pull: {
                books: {
                  bookId: info.bookId
                }
              }
            });

          case 31:
            newbook = {
              bookId: info.bookId,
              quantity: newqty,
              total: newqty * available.price
            };
            _context2.next = 34;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              $addToSet: {
                books: newbook
              }
            });

          case 34:
            _context2.next = 36;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 36:
            _newcart2 = _context2.sent;
            _totalAmount2 = _newcart2.books.map(function (book) {
              return book.total;
            }).reduce(function (acc, curr) {
              return acc + curr;
            }, 0);
            _context2.next = 40;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              totalAmount: _totalAmount2
            });

          case 40:
            _context2.next = 42;
            return _book["default"].updateOne({
              _id: info.bookId
            }, {
              $inc: {
                quantity: info.quantity
              },
              status: "Available"
            });

          case 42:
            return _context2.abrupt("return", true);

          case 43:
            _context2.next = 57;
            break;

          case 45:
            _oldqty = bookpresent.books.filter(function (book) {
              return book.bookId == info.bookId;
            })[0].quantity;
            _context2.next = 48;
            return _cart["default"].updateOne({
              userId: info.userId
            }, {
              $pull: {
                books: {
                  bookId: info.bookId
                }
              }
            });

          case 48:
            _context2.next = 50;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 50:
            _newcart3 = _context2.sent;
            _totalAmount3 = _newcart3.books.map(function (book) {
              return book.total;
            }).reduce(function (acc, curr) {
              return acc + curr;
            }, 0);
            _context2.next = 54;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              totalAmount: _totalAmount3
            });

          case 54:
            _context2.next = 56;
            return _book["default"].updateOne({
              _id: info.bookId
            }, {
              $inc: {
                quantity: _oldqty
              },
              status: "Available"
            });

          case 56:
            return _context2.abrupt("return", true);

          case 57:
            _context2.next = 60;
            break;

          case 59:
            return _context2.abrupt("return", "Book not found");

          case 60:
            _context2.next = 63;
            break;

          case 62:
            return _context2.abrupt("return", "Cart not Found");

          case 63:
            _context2.next = 68;
            break;

          case 65:
            _context2.prev = 65;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 68:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 65]]);
  }));

  return function removefromcart(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //View Cart by user


exports.removefromcart = removefromcart;

var viewcart = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(info) {
    var usercart, books;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 3:
            usercart = _context3.sent;

            if (!usercart) {
              _context3.next = 13;
              break;
            }

            books = usercart.books.length;

            if (!(books == 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", "Empty cart");

          case 10:
            return _context3.abrupt("return", usercart);

          case 11:
            _context3.next = 14;
            break;

          case 13:
            return _context3.abrupt("return", "Cart not Found");

          case 14:
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 16]]);
  }));

  return function viewcart(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); // Place Order


exports.viewcart = viewcart;

var placeorder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(info) {
    var usercart, books, cartdetails, orderdetails, newcart, totalAmount;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 3:
            usercart = _context4.sent;

            if (!usercart) {
              _context4.next = 24;
              break;
            }

            books = usercart.books.length;

            if (!(books == 0)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", "Empty cart");

          case 10:
            _context4.next = 12;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              isPurchased: true
            }, {
              "new": true
            });

          case 12:
            cartdetails = _context4.sent;
            orderdetails = {
              email: info.email,
              address: info.address,
              paymentMode: info.paymentmode,
              books: cartdetails.books,
              totalAmount: cartdetails.totalAmount
            };
            (0, _user.sendOrderConfirmation)(orderdetails);
            _context4.next = 17;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              isPurchased: false,
              books: []
            }, {
              "new": true
            });

          case 17:
            newcart = _context4.sent;
            totalAmount = newcart.books.map(function (book) {
              return book.total;
            }).reduce(function (acc, curr) {
              return acc + curr;
            }, 0);
            _context4.next = 21;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              totalAmount: totalAmount
            });

          case 21:
            return _context4.abrupt("return", true);

          case 22:
            _context4.next = 25;
            break;

          case 24:
            return _context4.abrupt("return", "Cart not Found");

          case 25:
            _context4.next = 30;
            break;

          case 27:
            _context4.prev = 27;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 27]]);
  }));

  return function placeorder(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.placeorder = placeorder;