import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/User.js';
import { configDotenv } from 'dotenv';

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

  res.status(200).json(allUsers);
};
