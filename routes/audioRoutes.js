import express from 'express';
import fs from 'fs';
import path from 'path';
import { authenticateApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route สำหรับแสดงรายชื่อไฟล์เสียง
router.get('/list-audio', authenticateApiKey, (req, res) => {
    const audioDirectory = path.join(__dirname, '../uploads/audio/');
    
    fs.readdir(audioDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve files', error: err.message });
        }
        res.status(200).json({ files });
    });
});

// Route สำหรับดึงไฟล์เสียง
router.get('/download-audio/:filename', authenticateApiKey, (req, res) => {
    const audioDirectory = path.join(__dirname, '../uploads/audio/');
    const filePath = path.join(audioDirectory, req.params.filename);

    res.download(filePath, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found', error: err.message });
        }
    });
});


export default router;
