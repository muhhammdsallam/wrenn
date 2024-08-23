import express from 'express';
import { login, logout, signup } from '../../controllers/authController.js';
import validateBody from '../../middleware/validateBody.js';
import loginSchema from '../../validations/auth/login.js';
import signupSchema from '../../validations/auth/signup.js';
import asyncHandler from '../../utils/asyncHandler.js';

const router = express.Router();

router.post('/signup', validateBody(signupSchema()), asyncHandler(signup));
router.post('/login', validateBody(loginSchema()), asyncHandler(login));
router.post('/logout', asyncHandler(logout));

export default router;
