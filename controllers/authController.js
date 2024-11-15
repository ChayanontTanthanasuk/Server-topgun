import jwt from 'jsonwebtoken';

// ฟังก์ชันสำหรับสร้าง API Key
export const generateApiKey = (req, res) => {
    const apiKey = jwt.sign({ device: 'raspberry-pi' }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ apiKey });
};