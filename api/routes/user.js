import express from 'express';
import { getAllUsers, getById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Get all
router.get('/', verifyAdmin, getAllUsers);

// Get by Id
router.get('/:id', verifyUser, getById);

export default router;
