import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
      default: "https://via.placeholder.com/150",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
