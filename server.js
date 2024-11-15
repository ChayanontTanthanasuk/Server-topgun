import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import machineRoutes from './routes/machineRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // นำเข้า uploadRoutes
import mqttRoutes from './routes/mqttRoutes.js';

dotenv.config(); // โหลดค่าจาก .env

// สร้างแอปพลิเคชัน Express
const app = express();

// ใช้งาน body-parser เพื่อ parse JSON จาก request body
app.use(bodyParser.json());

// เชื่อมต่อฐานข้อมูล MongoDB
connectDB();

// ตั้งค่า CORS (สามารถปรับการตั้งค่า origin ได้ตามต้องการ)
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001', // ใช้ CLIENT_URL จาก .env หากมี
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ใช้ routes ที่แยกออกมา
app.use('/api/users', userRoutes); // ใช้ router สำหรับผู้ใช้
app.use('/api/machine', machineRoutes); // ใช้ router สำหรับข้อมูลเครื่องจักร
app.use('/api/auth', authRoutes); // ใช้งาน route สำหรับขอ API Key
app.use('/api/data', dataRoutes); // ใช้งาน route สำหรับรับข้อมูล
app.use('/api/upload', uploadRoutes); // ใช้ route สำหรับการอัพโหลดไฟล์
app.use('/api/mqtt', mqttRoutes); // ใช้เส้นทาง MQTT

// WebSocket server
const wss = new WebSocketServer({ port: 8001 });
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.on('message', (message) => {
        console.log("Received message:", message);
        // ตัวอย่างการตอบกลับข้อความ
        ws.send('Message received');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// เริ่มต้น REST API server
const REST_PORT = process.env.PORT || 3030; // ใช้ PORT จาก .env ถ้ามี
app.listen(REST_PORT, () => {
    console.log(`REST API running on http://localhost:${REST_PORT}`);
});
