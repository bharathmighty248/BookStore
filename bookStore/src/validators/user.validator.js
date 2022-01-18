import Joi from '@hapi/joi';

export const Validator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(4)
      .required()
      .pattern(new RegExp('^[A-Za-z]{1}[a-z]{1,}$')),
    lastName: Joi.string()
      .min(4)
      .required()
      .pattern(new RegExp('^[A-Za-z]{1}[a-z]{1,}$')),
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          '[a-zA-Z]+[+_.-]{0,1}[0-9a-zA-Z]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}'
        )
      ),
    password: Joi.string()
      .required()
      .pattern(new RegExp('[A-Za-z]{3,}[$&=?@#|*%!]{1,}[0-9]{1,}')),
    role: Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
