import Joi from 'joi';

const loginSchema = () => {
  return Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).exist(),
  });
};

export default loginSchema;
