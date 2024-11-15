import express from 'express';
import multer from 'multer';
import { authenticateApiKey } from '../middleware/authMiddleware.js'; // ตรวจสอบ API Key

// ตั้งค่า multer สำหรับการจัดเก็บไฟล์ในโฟลเดอร์ uploads/audio
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/audio/'); // เก็บในโฟลเดอร์ audio
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // ตั้งชื่อไฟล์ใหม่
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route สำหรับการอัปโหลดไฟล์เสียง
router.post('/upload', authenticateApiKey, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
});

export default router;

