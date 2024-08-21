import express from 'express';
const router = express.Router();
import protectRoute from '../../middleware/protectRoute.js';
import { updateProfile } from '../../controllers/profileController.js';

// we need to get the users to show them to the sidebar

router.get('/updateProfile', protectRoute, updateProfile);

export default router; // only one default export per module
