import express from 'express';
const router = express.Router();
import protectRoute from '../../middleware/protectRoute.js';
import { updateProfile } from '../../controllers/profileController.js';
import memoryImageUpload from '../../instances/memoryUpload.js';
import filenameExists from '../../middleware/filesPayloadExists.js';
import { uploadProfilePic } from '../../controllers/profileController.js';
import resizeImage from '../../instances/pictureResizing.js';
import validateBody from '../../middleware/validateBody.js';
import updateProfileSchema from '../../validations/auth/updateProfile.js';

router.put(
  '/updateProfile',
  protectRoute,
  validateBody(updateProfileSchema()),
  updateProfile
);
router.route('/picture').post(
  [
    protectRoute,
    // resizeImage(200, 200),
    memoryImageUpload.single('image'),
    filenameExists('image'),
  ],
  // resizeImage(200, 200)],
  uploadProfilePic
);

export default router; // only one default export per module
