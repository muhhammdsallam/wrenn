import express from 'express';
import { sendMessage } from '../../controllers/messageController.js'; // named exports, must be within curly braces
import protectRoute from '../../middleware/protectRoute.js';
import { getMessages } from '../../controllers/messageController.js'; // named exports, must be within curly braces
import asyncHandler from '../../utils/asyncHandler.js';

const router = express.Router();

router.get('/:id', protectRoute, asyncHandler(getMessages));
router.post('/send/:id', protectRoute, asyncHandler(sendMessage));

export default router;
