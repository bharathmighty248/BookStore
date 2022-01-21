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
