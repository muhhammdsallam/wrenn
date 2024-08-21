import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import path from 'path';
import imageS3bucketRepo from '../repositories/imageS3bucketRepo.js';

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
  );

  if (!user) {
    return next(new AppError('user not found', 400));
  }

  console.log(updatedUser);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
  });
};

// const processImage = async (buffer) => {
//   try {
//     const arr = buffer.toString().split(/\r?\n/);

//     if (arr.length < parseInt(process.env.IMAGE_MIN_SIZE)) {
//       throw new AppError(`Small image, expected at least ${minImageSize}`);
//     }
//     return arr
//       .slice(0, parseInt(process.env.IMAGE_MIN_SIZE))
//       .map((i) => Number(i));
//   } catch (err) {
//     if (err instanceof AppError) {
//       throw err;
//     }
//     throw new AppError('Invalid image', 400);
//   }
// };

//  @desc   allows users to upload new profile picture
//  @route  POST /api/profile/picture
//  @access public
//  @body   imageFile
export const uploadProfilePic = async (req, res) => {
  const userId = req.user._id;

  // process image first
  // await processImage(req.file.buffer);
  const fileExt = path.extname(req.file.originalname);
  const keyName = `photos/${userId}${fileExt}`;
  const s3Object = await imageS3bucketRepo.uploadProfilePicture(
    keyName,
    req.file.buffer
  );

  const profilePicture = s3Object.Key;

  const filter = { _id: userId };
  const update = { profilePic: profilePicture };

  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  await imageS3bucketRepo.signProfilePictureFile(updatedUser);

  return res.status(200).json({
    profile: updatedUser,
  });
};
