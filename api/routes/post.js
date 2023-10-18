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
router.get('/:post_id/comment', getAllComments);

// Create comment
router.post('/:post_id/comment', createComment);

// Update comment
router.put('/:post_id/comment/:commentId', updateComment);

// Delete comment
router.delete('/:post_id/comment/:commentId', deleteComment);

export default router;
