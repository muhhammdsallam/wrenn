import Joi from 'joi'

// TODO: validations later
const loginSchema = () => {
    return Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().min(6).exist(),
    });
  };
  
  module.exports = loginSchema;