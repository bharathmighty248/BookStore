import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const auth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    jwt.verify(bearerToken, process.env.SECRET_KEY,(error, decodedtoken) => {
      if (error) {
        throw {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Authorization Failed'
        };
      } else {
        req.user = decodedtoken;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to Set Role either Admin or User
 *
 * @param {String} role
 */
export const setRole = (role) => {
  return (req, res, next) => {
    req.body.role = role;
    next();
  }
};

/**
 * Middleware to verify Role
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
 export const verifyRole = (req, res, next) => {
  if (req.user.role == 'Admin'){
    next();
  } else {
    throw {
      code: HttpStatus.UNAUTHORIZED,
      message: 'Only Admin Had this Permissions'
    };
  }
};
