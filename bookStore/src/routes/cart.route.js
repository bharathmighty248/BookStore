import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

// route to addToCart
router.put('/addtocart', auth, cartController.addtocart);

// route to removeFromCart
router.put('/removefromcart', auth, cartController.removefromcart);

// route to veiw his Cart by the user
router.get('/viewcart', auth, cartController.viewcart);

// route to place order
router.put('/placeorder', auth, cartController.placeorder);

// route to see order details
router.get('/orderdetails/:token', cartController.orderdetails);

export default router;
