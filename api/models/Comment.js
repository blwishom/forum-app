import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User"
    },
    post: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Post"
    }
    //kasdf;j
  },
  {
    timestamps: true
  }
)

export default mongoose.model("Comment", CommentSchema);
