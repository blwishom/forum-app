import Post from "../models/Post.js";
import User from "../models/Users.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// Get All Posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "username");
    return next(CreateSuccess(200, "All posts", posts));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

// Get Single Post
export const getById = async (req, res, next) => {
  console.log("This is the param: " + req.params.id);
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: "author",
        select: "username",
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "author",
            select: "username",
          },
          {
            path: "post",
            select: "_id",
          },
        ],
      });
    if (!post) {
      return next(CreateError(404, "Post not found"));
    }
    return next(
      CreateSuccess(200, "Single Post", {
        post,
      })
    );
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

// Create Post
export const createPost = async (req, res, next) => {
  try {
    const foundAuthor = await User.findById(req.body.user_id);
    if (!foundAuthor) {
      return next(CreateError(404, "Author not found"));
    } else {
      if (!req.body.title || req.body.title === "") {
        return next(CreateError(400, "Bad Request"));
      } else {
        const newPost = new Post({
          title: req.body.title,
          content: req.body.content,
          author: foundAuthor,
        });
        await newPost.save();
        return next(CreateSuccess(200, "Post created successfully!", newPost));
      }
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

// Update Post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return next(CreateSuccess(200, "Post updated", updatedPost));
    } else {
      return next(CreateError(404, "Post not found"));
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

// Delete Post
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      await Post.findByIdAndDelete(postId);
      return next(CreateSuccess(200, "Post deleted"));
    } else {
      return next(CreateError(404, "Post not found"));
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};
