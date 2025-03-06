import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json()); // will allow us to parse JSON request(req.body) bodies

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})