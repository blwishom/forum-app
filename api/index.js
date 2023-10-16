import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import postRoute from './routes/post.js';
import commentRoute from './routes/comment.js';
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  credentials: true
}));
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

// Response Handler Middleware
app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const errorMessage = obj.message || "Something want wrong!";
  return res.status(statusCode).json({
    success: [200, 201, 204].some(a=> a === obj.status) ? true : false,
    status: statusCode,
    message: errorMessage,
    data: obj.data,
    stack: obj.stack
  });
})

//DB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    throw error;
  }
}

app.listen(8800, () => {
  connectMongoDB();
  console.log("Connected to backend!");
})
