import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

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
 * Controller to ResetPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const resetPassword = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email,
      newPassword: req.body.newPassword,
      resetcode: req.body.resetcode
    }
    const data = await UserService.resetPassword(info);
    if (data == "code expired") {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Reset-code is expired, Request new Reset-code'
      });
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Password reset successfull'
      });
    }
  } catch (error) {
    next(error);
  }
};
