import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const SECRET_KEY = 'your_jwt_secret_key';

// ฟังก์ชันสำหรับ login
export const login = (req, res) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
};

// ฟังก์ชันสำหรับเพิ่ม User
export const addUser = async (req, res) => {
    const { name, age } = req.body;
    const newUser = new User({ name, age });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User added successfully!', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error saving user', error: err.message });
    }
};
