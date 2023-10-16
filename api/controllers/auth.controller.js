import Role from "../models/Role.js";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import UserToken from "../models/UserToken.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.userName,
    email: req.body.email,
    password: hashPassword,
    roles: role,
  });
  await newUser.save();
  // return res.status(200).json("User created successfully!");
  return next(CreateSuccess(200, "User created successfully!"));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );

    const { roles } = user;
    if (!user) return next(CreateError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(CreateError(400, "Invalid credentials"));
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .json({
        status: 200,
        message: "Log in successfully!",
        data: user,
      });
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    isAdmin: true,
    roles: role,
  });
  await newUser.save();
  return next(CreateSuccess(200, "Admin created successfully!", newUser));
};

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });
  if (!user) return next(CreateError(404, "User not found with this email!"));
  const payload = {
    email: user.email,
  };

  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user._id,
    token: token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nakashimabaka@gmail.com",
      pass: "ktqojqpaajuoikym",
    },
  });

  let mailDetails = {
    from: "nakashimabaka@gmail.com",
    to: email,
    subject: "Reset password",
    html: `
    <html>
    <head>
        <title>Password Reset Request</title>
    </head>
    <body>
        <h1>Password Reset Request</h1>
        <p>Dear ${user.username},</p>
        <p>Here's your reset password link:</p>
        <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Password</button></a>
        <p>This link is only valid for 5 minutes.</p>
        <p>Thank you,</p>
        <p>UtterBuzz team</p>
    </body>
    </html>`,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(
        CreateError(500, "Something went wrong while sending the email!")
      );
    } else {
      await newToken.save();
      return next(CreateSuccess(200, "Email sent successfully!"));
    }
  });
};

export const resetPassword = async (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return next(CreateError(500, "Invalid token or token expired!"));
    } else {
      const response = data;
      const user = await User.findOne({
        email: { $regex: "^" + response.email + "$", $options: "i" },
      });
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);
      user.password = encryptedPassword;
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );
        return next(CreateSuccess(200, "Password reset successfully!"));
      } catch (error) {
        return next(
          CreateError(500, "Something went wrong while resetting the password!")
        );
      }
    }
  });
};
