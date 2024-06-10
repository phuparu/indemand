import jwt from 'jsonwebtoken';
import express from 'express';
import logger from '../Middleware/logger.js';

import {
    updateProfile,
    getProfile,
    updateStudentProfile,
    getStudentProfile,
    getTutorProfile,
    updateTutorProfile,
    getName,
} from '../Models/profile.js';
import { getRole } from '../Models/auth.js';

const profileRouter = express.Router();

profileRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

profileRouter.post('/get', async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const role = await getRole(user_id);
        if (role === 'student') {
            const profile = await getStudentProfile(user_id);
            res.status(200).json(profile);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

profileRouter.get('/get', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }

        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;
        const role = await getRole(user_id);
        if (role === 'student') {
            const profile = await getStudentProfile(user_id);
            res.status(200).json(profile);
        } else if (role === 'tutor') {
            const profile = await getTutorProfile(user_id);
            res.status(200).json(profile);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

profileRouter.post('/update/tutor', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }
        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;

        const { fullname, email, profile, } = req.body;
        const result = await updateTutorProfile(user_id, fullname, email, profile);
        res.status(200).json(result);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

profileRouter.post('/update/student', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }
        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;

        const { username, email, gender, school, grade } = req.body;
        const result = await updateStudentProfile(user_id, username, email, gender, school, grade);
        res.status(200).json(result);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});


profileRouter.get('/getName', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }

        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;
        const name = await getName(user_id);
        res.status(200).json(name);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});



export default profileRouter;