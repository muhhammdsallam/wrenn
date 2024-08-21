import express from 'express';
import { login, logout, signup } from '../../controllers/authController.js';
import validateBody from '../../middleware/validateBody.js';
import loginSchema from '../../validations/auth/login.js';
import signupSchema from '../../validations/auth/signup.js';

const router = express.Router();

router.post('/signup', validateBody(signupSchema()), signup);
router.post('/login', validateBody(loginSchema()), login);
router.post('/logout', logout);

export default router;
