import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes/message.js';

import userRoutes from './routes/user.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse incoming requests to json payloads
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is Running on port ${PORT} `);
});
