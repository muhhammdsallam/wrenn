import express from 'express';
import { getUsers } from '../../controllers/userController.js';
const router = express.Router();
import protectRoute from '../../middleware/protectRoute.js';

// we need to get the users to show them to the sidebar

router.get('/', protectRoute, getUsers);

export default router; // only one default export per module
