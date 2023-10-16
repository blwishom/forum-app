import express from 'express';
import { getById } from '../controllers/comment.controller.js';

const router = express.Router();

// Get by Id
router.get('/:commentId', getById)


export default router;
