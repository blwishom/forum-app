import Comment from "../models/Comment.js";
import User from "../models/Users.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// Get All Comments
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("author", "username").populate("post", "title");
    return next(CreateSuccess(200, "All comments", comments));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
}

// Get Single Comment
export const getById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate("author", "username").populate("post", "title");
    if (!comment) {
      return next(CreateError(404, "Comment not found"));
    }
    return next(CreateSuccess(200, "Single Comment", comment));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
}

// Create Comment
export const createComment = async (req, res, next) => {
  try {
    const foundAuthor = await User.findOne({ author: req.body.author });
    if (!foundAuthor) {
      return next(CreateError(404, "Author not found"));
    }
    const foundPost = await Post.findById(req.params.id);
    if (!foundPost) {
      return next(CreateError(404, "Post not found"));
    } else {
      if (!req.body.content || req.body.content === "") {
        return next(CreateError(400, "Bad Request"));
      } else {
        const newComment = new Comment({
          content: req.body.content,
          post: foundPost,
          author: foundAuthor
        });
        await newComment.save();
        return next(CreateSuccess(201, "Comment created", newComment));
      }
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
}

// Update Comment
export const updateComment = async (req, res, next) => {
  try {
    const foundComment = await Comment.findById(req.params.commentId);
    if (!foundComment) {
      return next(CreateError(404, "Comment not found"));
    } else {
      const foundAuthor = await User.findOne({ author: req.body.author });
      if (!foundAuthor) {
        return next(CreateError(404, "Author not found"));
      } else {
        const foundPost = await Post.findById(req.params.id);
        if (!foundPost) {
          return next(CreateError(404, "Post not found"));
        } else {
          if (!req.body.content || req.body.content === "") {
            return next(CreateError(400, "Bad Request"));
          } else {
            const updatedComment = await Comment.findByIdAndUpdate(
              req.params.commentId,
              { $set: req.body },
              { new: true }
            );
            return next(CreateSuccess(200, "Comment updated", updatedComment));
          }
        }
      }
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
}

// Delete Comment
export const deleteComment = async (req, res, next) => {
  try {
    const foundComment = await Comment.findById(req.params.commentId);
    if (!foundComment) {
      return next(CreateError(404, "Comment not found"));
    } else {
      const foundAuthor = await User.findOne({ author: req.body.author });
      if (!foundAuthor) {
        return next(CreateError(404, "Author not found"));
      } else {
        const foundPost = await Post.findById(req.params.id);
        if (!foundPost) {
          return next(CreateError(404, "Post not found"));
        } else {
          await Comment.findByIdAndDelete(req.params.commentId);
          return next(CreateSuccess(200, "Comment deleted"));
        }
      }
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
}
