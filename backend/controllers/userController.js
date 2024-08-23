import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/User.js';
import { configDotenv } from 'dotenv';
import imageS3bucketRepo from '../repositories/imageS3bucketRepo.js';

//  @desc   Get all users from the DB to be shown to the user
//  @route  GET /api/user
//  @access public
//  @body   -
export const getUsers = async (req, res) => {
  const userId = req.user._id;
  const allUsers = await User.find({
    _id: {
      $ne: userId,
    },
  }).select('-password');

  const usersWithSignedURLs = await Promise.all(
    allUsers.map(async (user) => {
      let profilePicUrl = user.profilePic;

      if (profilePicUrl && !profilePicUrl.startsWith('http')) {
        profilePicUrl = await imageS3bucketRepo.signProfilePictureFile(
          user.profilePic
        );
      }

      return {
        ...user.toObject(),
        profilePic: profilePicUrl,
      };
    })
  );

  res.status(200).json(usersWithSignedURLs);
};
