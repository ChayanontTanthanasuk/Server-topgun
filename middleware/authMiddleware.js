import jwt from 'jsonwebtoken';

export const authenticateApiKey = (req, res, next) => {
    const apiKey = req.header('Authorization')?.replace('Bearer ', '');

    if (!apiKey) {
        return res.status(403).json({ message: 'No API Key provided' });
    }

    try {
        jwt.verify(apiKey, process.env.SECRET_KEY);
        next(); // ดำเนินการต่อไป
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired API Key' });
    }
};
