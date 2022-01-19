import express from 'express';
import * as bookController from '../controllers/book.controller';
import { auth, verifyRole } from '../middlewares/auth.middleware';

const router = express.Router();

// route to add book
router.post('/addbook', auth, verifyRole, bookController.addbook);

// route to Get all books
router.get('/getallbooks',bookController.getallbooks);

// route to update book
router.put('/updatebook/:bookId',auth, verifyRole, bookController.updatebook);

export default router;