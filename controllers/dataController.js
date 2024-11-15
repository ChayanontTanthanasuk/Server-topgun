import jwt from 'jsonwebtoken';

// ฟังก์ชันตรวจสอบ API Key และแสดงผลข้อมูล
export const receiveData = (req, res) => {
    const apiKey = req.header('Authorization')?.replace('Bearer ', '');

    if (!apiKey) {
        return res.status(403).json({ message: 'No API Key provided' });
    }

    try {
        // ตรวจสอบ API Key
        const decoded = jwt.verify(apiKey, process.env.SECRET_KEY);
        console.log('Data received from:', decoded.device);
        console.log('Data:', req.body);

        res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired API Key' });
    }
};
