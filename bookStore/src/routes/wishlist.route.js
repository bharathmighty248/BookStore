import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

// route to addToCart
router.post('/add', auth, wishlistController.add);

export default router;
