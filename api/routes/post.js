import express from 'express';
import { getAllPosts, getById, createPost, updatePost, deletePost } from '../controllers/post.controller.js';
import { getAllComments, createComment, updateComment, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

// Get all posts
router.get('/', getAllPosts);

// Get by Id
router.get('/:id', getById);

// Create post
router.post('/', createPost);

// Update post
router.put('/:id', updatePost);

// Delete post
router.delete('/:id', deletePost);

// Get all comments
router.get('/:id/comment', getAllComments);

// Create comment
router.post('/:id/comment', createComment);

// Update comment
router.put('/:id/comment/:commentId', updateComment);

// Delete comment
router.delete('/:id/comment/:commentId', deleteComment);

export default router;
