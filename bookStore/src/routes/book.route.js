import express from 'express';
import * as bookController from '../controllers/book.controller';
import { auth, verifyRole } from '../middlewares/auth.middleware';

const router = express.Router();

// route to add book
router.post('/addbook', auth, verifyRole, bookController.addbook);

export default router;
