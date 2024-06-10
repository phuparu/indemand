import cors from 'cors';
import dotenv from 'dotenv'
import express from 'express';
import cookieParser from 'cookie-parser';

import logger, { consoleLogExpress } from './Middleware/logger.js';
import authMiddleware from './Middleware/auth.js';

import userRouter from './Routes/authRoutes.js';
import roleRouter from './Routes/roleRoutes.js';
import courseRouter from './Routes/courseRoutes.js';
import profileRouter from './Routes/profileRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: [
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:5173',
    ],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(consoleLogExpress);

app.all("/", (req, res) => {
    res.sendStatus(200)
});

app.use("/auth", userRouter)
app.use("/course", courseRouter);
app.use("/role", roleRouter);
app.use("/profile", profileRouter)
app.use("/booking", bookingRouter);


app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});