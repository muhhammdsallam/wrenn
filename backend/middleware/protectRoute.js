import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    const user = await User.findById(decodedToken.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User Not Found' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default protectRoute;
