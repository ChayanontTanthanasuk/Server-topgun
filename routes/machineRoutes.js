import express from 'express';
import { addMachineData, getMachineData } from '../controllers/machineController.js';

const router = express.Router();

// Add machine data route
router.post('/', addMachineData);

// Get machine data route
router.get('/', getMachineData);

export default router;
