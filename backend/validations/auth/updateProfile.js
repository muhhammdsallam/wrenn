import Joi from 'joi';

const updateProfileSchema = () => {
  return Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    // password: Joi.string()
    //   .pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$'))
    //   .messages({
    //     'string.pattern.base':
    //       "Password must be between 3 and 30 characters and can contain letters, numbers, and '@'.",
    //   }),

    // confirmPassword: Joi.string().when('password', {
    //   is: Joi.exist(),
    //   then: Joi.required().valid(Joi.ref('password')).messages({
    //     'any.only': 'Passwords do not match.',
    //   }),
    //   otherwise: Joi.optional(),
    // }),
  });
};

export default updateProfileSchema;
