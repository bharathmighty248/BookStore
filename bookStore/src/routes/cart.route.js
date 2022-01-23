import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

// route to addToCart
router.put('/addtocart', auth, cartController.addtocart);

// route to removeFromCart
router.put('/removefromcart', auth, cartController.removefromcart);

export default router;
