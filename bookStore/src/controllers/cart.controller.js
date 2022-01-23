import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

/**
 * Controller to AddToCart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addtocart = async (req, res, next) => {
  try {
    const info = {
        userId: req.user.id,
        bookId: req.body.bookId,
        quantity: req.body.quantity
    }
    const data = await CartService.addtocart(info);
    if (data == true) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book added into cart successfully'
        });
    } else if (data == "Sold Out") {
        res.status(HttpStatus.TEMPORARY_REDIRECT).json({
            code: HttpStatus.TEMPORARY_REDIRECT,
            message: 'Sold Out'
        });
    } else if (data == "less stock") {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'stock is not available, please reduce order quantity'
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Remove from Cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removefromcart = async (req, res, next) => {
  try {
    const info = {
        userId: req.user.id,
        bookId: req.body.bookId,
        quantity: req.body.quantity
    }
    const data = await CartService.removefromcart(info);
    if (data == true) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book removed from cart Successfully'
        });
    }  else if (data == "Cart not Found") {
        res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'Cart not Found'
        });
    } else if (data == "Book not found") {
        res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'Book is not in the cart'
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to view his Cart by the user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const viewcart = async (req, res, next) => {
    try {
        const info = {
            userId: req.user.id
        }
        const data = await CartService.viewcart(info);
        if (data == "Empty cart") {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Your cart is empty!'
            });
        } else if (data == "Cart not Found") {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Cart not Found, Start by adding books in to new cart'
            });
        } else {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'Your cart..',
                data
            });
        }
    } catch (error) {
      next(error);
    }
  };
