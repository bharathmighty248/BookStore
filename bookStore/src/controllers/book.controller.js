import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

/**
 * Controller to Register Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addbook = async (req, res, next) => {
  try {
    const info = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    }
    const data = await BookService.addbook(info);
    if (data) {
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            message: 'Book added successfully',
            data: {
              author: data.author,
              title: data.title,
              description: data.description,
              quantity: data.quantity,
              price: data.price
            }
        });
    }
  } catch (error) {
    next(error);
  }
};