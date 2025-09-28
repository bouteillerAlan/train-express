import express from 'express';
import userRoutes from './routes/user.js';

const app = express();

app.use('/users', userRoutes)

export default app;
