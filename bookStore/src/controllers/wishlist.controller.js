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

/**
 * Controller to Remove from Wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const remove = async (req, res, next) => {
    try {
        const info = {
            userId: req.user.id,
            bookId: req.body.bookId
        }
        const data = await WishlistService.remove(info);
        if (data == true) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'Book removed from wishlist successfully'
            });
        } else if (data == "Not found") {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Book not found in wishlist'
            });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Wishlist not available or empty'
            });
        }
    } catch (error) {
      next(error);
    }
  };

/**
 * Controller to view my Wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const mywishlist = async (req, res, next) => {
    try {
        const info = {
            userId: req.user.id
        }
        const data = await WishlistService.mywishlist(info);
        if (data == false) {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Wishlist not available or empty'
            });
        } else {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'Your wishlist..',
                data
            });
        }
    } catch (error) {
      next(error);
    }
  };
