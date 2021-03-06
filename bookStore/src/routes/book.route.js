import express from 'express';
import * as bookController from '../controllers/book.controller';
import { auth, verifyRole } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/image.middleware';

const router = express.Router();

// route to add book
router.post('/addbook', auth, verifyRole, upload.single('productImage'), bookController.addbook);

// route to Get all books
router.get('/getallbooks',bookController.getallbooks);

// route to update book
router.put('/updatebook/:bookId',auth, verifyRole, bookController.updatebook);

// route to delete book
router.delete('/deletebook/:bookId',auth, verifyRole, bookController.deletebook);

// route to Search Book
router.get('/searchbook/:title',bookController.searchbook);

export default router;
