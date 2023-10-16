import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference to the Comment model for the post's comments
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
