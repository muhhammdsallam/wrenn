import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/User.js';

// getMyProfile method

// updateProfilePic method

// PUT method to update user data
export const updateProfile = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const { fullName, username, password, confirmPassword } = req.body;
  
      // TODO add joi for input validation
  
      const updatedUser = {};
  
      if (password && confirmPassword) { 
        if (password === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          updatedUser.password = await bcrypt.hash(password, salt);
        } else {
          return res.status(500).json({ error: "passwords don't match" });
        }
      }
  
      if (fullName) {
        updatedUser.fullName = fullName;
      }
      if (username) {
        updatedUser.username = username;
      }
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updatedUser },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      console.log(updatedUser);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  