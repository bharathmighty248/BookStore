import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Register Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const register = async (req, res, next) => {
  try {
    const info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    const data = await UserService.register(info);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Registration successfull',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role
        }
      });
    } else {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: 'Email Already Exist'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Login Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const login = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email,
      password: req.body.password
    }
    const data = await UserService.login(info);
    if (data == "Not Registered Yet") {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Not Registered Yet'
      });
    } else if (data == "Incorrect Password") {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect Password'
      });
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Login Successful',
        token: data
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to ForgotPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const forgotPassword = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email
    }
    const data = await UserService.forgotPassword(info);
    if (data == "Not Registered Yet") {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Not Registered Yet'
      });
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Reset-code Sent to your Email'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
