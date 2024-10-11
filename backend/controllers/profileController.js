import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import path from 'path';
import {
  uploadProfilePicture,
  signProfilePictureFile,
  deleteProfilePicture,
} from '../repositories/imageS3bucketRepo.js';

// getMyProfile method

// updateProfilePic method

//  @desc   updates the user profile data
//  @route  PUT /api/profile/updateprofile
//  @access public
//  @body   fullName username password confirmPassword
export const updateProfile = async (req, res, next) => {
  // TODO make update password separate from update profile
  const userId = req.user._id;

  const { fullName, username } = req.body;

  const updatedUser = {};

  // if (password && confirmPassword) {
  //   const salt = await bcrypt.genSalt(10);
  //   updatedUser.password = await bcrypt.hash(password, salt);
  // }

  updatedUser.fullName = fullName;

  updatedUser.username = username;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updatedUser },
    { new: true }
  ).select('-password');

  if (!user) {
    return next(new AppError('user not found', 400));
  }

  console.log(updatedUser);

  res.status(200).json({
    profile: user,
  });
};

//  @desc   allows users to upload new profile picture
//  @route  POST /api/profile/picture
//  @access public
//  @body   imageFile
export const uploadProfilePic = async (req, res) => {
  const userId = req.user._id;

  // process image first
  // const fileExt = path.extname(req.file.originalname);
  const keyName = `photos/${userId}.jpg`;

  const response = await uploadProfilePicture(keyName, req.file.buffer);

  console.log(response);

  const filter = { _id: userId };
  const update = { profilePic: keyName };

  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  }).select('-password');

  const url = await signProfilePictureFile(keyName);

  return res.status(200).json({
    profile: updatedUser,
    signedProfilePic: url,
  });
};

export const deleteProfilePic = async (req, res) => {
  const userId = req.user._id;

  const keyName = `photos/${userId}.jpg`;

  const response = await deleteProfilePicture(keyName);

  console.log(response);

  const filter = { _id: userId };
  const update = {
    profilePic:
      req.user.gender === 'male'
        ? process.env.BOY_PIC.concat(req.user.username)
        : process.env.GIRL_PIC.concat(req.user.username),
  };

  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  }).select('-password');

  return res.status(200).json({
    profile: updatedUser,
  });
};
