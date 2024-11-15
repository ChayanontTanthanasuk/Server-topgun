import express from 'express';
import { receiveData } from '../controllers/dataController.js';

const router = express.Router();

// สร้างเส้นทางสำหรับรับข้อมูล
router.post('/receive-data', receiveData);

export default router;
