import express from 'express';
import { sendMessage } from '../../controllers/messageController.js'; // named exports, must be within curly braces
import protectRoute from '../../middleware/protectRoute.js';
import { getMessages } from '../../controllers/messageController.js'; // named exports, must be within curly braces

const router = express.Router();

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
