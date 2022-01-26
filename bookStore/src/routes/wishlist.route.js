import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

// route to add to wishlist
router.post('/add', auth, wishlistController.add);

// route to remove from wishlist
router.put('/remove', auth, wishlistController.remove);

export default router;
