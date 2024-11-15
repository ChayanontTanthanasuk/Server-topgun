import express from 'express';
import mqtt from 'mqtt';

const router = express.Router();
const client = mqtt.connect('mqtt://broker.hivemq.com'); // ใช้ MQTT broker ที่ต้องการ

// เมื่อเชื่อมต่อกับ MQTT broker ได้สำเร็จ
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('your/topic'); // ระบุ topic ที่ต้องการ subscribe
});

// เมื่อได้รับข้อความจาก MQTT
client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    // สามารถบันทึกหรือประมวลผลข้อมูลที่ได้รับตรงนี้ได้
});

export default router;
