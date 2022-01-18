import express from 'express';
import * as userController from '../controllers/user.controller';
import { Validator } from '../validators/user.validator';
import { userAuth, setRole } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new Admin
router.post('/admin', Validator, setRole('Admin'), userController.register);

//route to create a new User
router.post('/user', Validator, setRole('User'), userController.register);

//route to login user or Admin
router.post('/login', userController.login);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
