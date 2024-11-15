import express from 'express';
import { generateApiKey } from '../controllers/authController.js';

const router = express.Router();

// สร้าง route สำหรับ get-api-key
router.get('/get-api-key', generateApiKey);

export default router;

