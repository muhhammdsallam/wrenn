import Joi from 'joi';

const signupSchema = () => {
  return Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$'))
      .required()
      .messages({
        'string.pattern.base':
          "Password must be between 3 and 30 characters and can contain letters, numbers, and '@'.",
        'any.required': 'Password is required.',
      }),

    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match.',
        'any.required': 'Confirm Password is required.',
      }),
    gender: Joi.string().valid('male', 'female').required(),
    profilePic: Joi.string().uri().optional(),
  });
};

export default signupSchema;
