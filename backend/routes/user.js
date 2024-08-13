import express from 'express';
import { getUsers, updateUser } from '../controllers/user.js';
const router = express.Router();
import protectRoute from '../middleware/protectRoute.js';
import { Router } from 'express';

// we need to get the users to show them to the sidebar

router.get('/', protectRoute, getUsers);
router.put('/update', protectRoute, updateUser);

export default router; // only one default export per module
