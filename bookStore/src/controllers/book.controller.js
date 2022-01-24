import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

/**
 * Controller to Add book by Admin
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

/**
 * Controller to Get all books
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getallbooks = async (req, res, next) => {
  try {
    const data = await BookService.getallbooks();
    if (data) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Available books',
            data
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Update Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updatebook = async (req, res, next) => {
  try {
    const info = {
        bookId: req.params.bookId,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    }
    const data = await BookService.updatebook(info);
    if (data == "Book Not Found") {
        res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'Book Not Found'
          });
    } else {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book updated successfully'
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Delete book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deletebook = async (req, res, next) => {
  try {
    const data = await BookService.deletebook(req.params.bookId);
    if (data != null){
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book deleted successfully'
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
 * Controller to Get all books
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const searchbook = async (req, res, next) => {
  try {
    const info = req.params.title
    const data = await BookService.searchbook(info);
    if (data.length != 0) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'search results',
            data
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
