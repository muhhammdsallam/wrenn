import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import AppError from '../utils/AppError.js';

//  @desc   registers a new user into the system and return access token
//  @route  POST /api/auth/signup
//  @access public
//  @body   fullName username password confirmPassword gender
export const signup = async (req, res, next) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return next(
      new AppError('A User with the same username Already Exists', 400)
    );
  }

  // hash password here
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic:
      gender === 'male'
        ? process.env.BOY_PIC.concat(username)
        : process.env.GIRL_PIC.concat(username),
  });

  // generate JWT Token here
  generateTokenAndSetCookie(newUser._id, res);

  await newUser.save();
  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
  });
};

//  @desc   logins a user into the system and return access token and user data
//  @route  POST /api/auth/login
//  @access public
//  @body   username   password
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ''
  );

  if (!user || !isPasswordCorrect) {
    return next(new AppError('Invalid username or password', 400));
  }

  generateTokenAndSetCookie(user._id, res);
  return res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic,
  });
};

//  @desc   logouts the user from the system and resets the cookie
//  @route  POST /api/auth/logout
//  @access public
//  @body   -
export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
