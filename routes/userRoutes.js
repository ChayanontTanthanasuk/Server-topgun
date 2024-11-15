import express from 'express';
import { login, addUser } from '../controllers/userController.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Add user route
router.post('/add-user', addUser);

export default router;
