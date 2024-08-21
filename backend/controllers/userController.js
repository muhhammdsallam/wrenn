import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/User.js';
import { configDotenv } from 'dotenv';

export const getUsers = async (req, res) => {
  try {
    // we need to get the userId from the request,
    // then get all the users that they have a conversation with him in common

    // for simplicity for now we will get all users from the database

    const userId = req.user._id;
    const allUsers = await User.find({
      _id: {
        $ne: userId,
      },
    }).select('-password');

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
