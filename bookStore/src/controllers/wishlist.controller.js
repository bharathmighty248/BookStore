import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

/**
 * Controller to AddToWishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const add = async (req, res, next) => {
  try {
    const info = {
        userId: req.user.id,
        bookId: req.body.bookId
    }
    const data = await WishlistService.add(info);
    if (data == true) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book added into wishlist successfully'
        });
    }else if (data == "Already added") {
        res.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: 'Book already in wishlist'
        });
    } else {
        res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'Book Not Found'
        });
    }
  } catch (error) {
    next(error);
  }
};
