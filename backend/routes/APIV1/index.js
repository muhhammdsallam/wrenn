import express from 'express';

const router = express.Router();

import auth from './auth.js'
import message from './message.js';
import user from './user.js';
import profile from './profile.js'

router.use('/auth', auth);
router.use('/messages', message);
router.use('/users', user);
router.use('/profile', profile)

export default router;