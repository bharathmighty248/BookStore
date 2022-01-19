import express from 'express';
import * as userController from '../controllers/user.controller';
import { Validator,resetPasswordValidator } from '../validators/user.validator';
import { setRole } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new Admin
router.post('/admin', Validator, setRole('Admin'), userController.register);

//route to create a new User
router.post('/user', Validator, setRole('User'), userController.register);

//route to login user or Admin
router.post('/login', userController.login);

//route to forgotPassword
router.post('/forgotpassword',userController.forgotPassword);

//route to resetPassword
router.post('/resetpassword',resetPasswordValidator, userController.resetPassword);

export default router;
