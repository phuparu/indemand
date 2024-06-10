import jwt from 'jsonwebtoken';
import express from 'express';
import logger from '../Middleware/logger.js';

import {
    newBooking,
    checkForOverlap,
    getTutorBooking,
    updateBooking,
} from '../Models/booking.js';
import { getRole } from '../Models/auth.js';

const bookingRouter = express.Router();
bookingRouter.use(express.json());

bookingRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

bookingRouter.post('/new', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }
        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;

        const { course, date, startTime, endTime } = req.body;
        if (!course || !date || !startTime || !endTime) { return res.sendStatus(400); }

        const booking = await newBooking(user_id, course, date, startTime, endTime);
        res.status(201).json(booking);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

bookingRouter.post('/availability', async (req, res) => {
    try {
        const { course, date, startTime, endTime } = req.body;
        if (!course || !date || !startTime || !endTime) { return res.sendStatus(400); }

        const overlap = await checkForOverlap(course, date, startTime, endTime);
        console.log(overlap.length);
        if (overlap.length == 0) {
            res.status(200).json({ available: true });
        } else {
            res.status(200).json({ available: false });
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

bookingRouter.get('/getTutorBooking', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }
        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;
        if (await getRole(user_id) !== 'tutor') { return res.sendStatus(403); }

        const booking = await getTutorBooking(user_id);
        res.status(200).json(booking);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

bookingRouter.get('/getStudentBooking', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }
        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;
        if (await getRole(user_id) !== 'student') { return res.sendStatus(403); }

        const booking = await getBooking(user_id);
        res.status(200).json(booking);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

bookingRouter.post('/update', async (req, res) => {
    try {
        const { session_id, status, feedback, date, start_time, end_time } = req.body;
        if (!booking_id) { return res.sendStatus(400); }

        const booking = await updateBooking(session_id, status, feedback, date, start_time, end_time);
        res.status(200).json(booking);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});


export default bookingRouter;