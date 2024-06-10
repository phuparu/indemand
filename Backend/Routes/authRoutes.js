import jwt from 'jsonwebtoken';
import express from 'express';
import logger from '../Middleware/logger.js';
import dotenv from 'dotenv';

import {
    registerUser,
    getUser,
    findUser,
    updateUser,
    checkEmailDupe,
    deleteUser,
    getRole,
    comparePassword,
    allUsers,
} from '../Models/auth.js';
import { setStudentRole } from '../Models/role.js';

const authRouter = express.Router();
dotenv.config();

authRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) { return res.sendStatus(400); }

        const user = await findUser(username);
        if (!user) { return res.sendStatus(401); }

        if (await comparePassword(password, user.password)) {
            console.log()
            const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                    },
                    token: token,
                    role: await getRole(user.user_id)
                }
            );

        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password) { return res.status(400).send("Username and password are required"); }

        const user = await findUser(username);
        if (user) { return res.status(401).send('Account already exists'); }
        if (await checkEmailDupe(email)) { return res.status(401).send('Email already in use'); }

        const newUser = await registerUser(username, email, password);
        await setStudentRole(newUser.user_id);
        res.status(201).json(newUser);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ token: null });
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/get', async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const user = await getUser(user_id);
        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/update', async (req, res) => {
    try {
        const { user_id, username, email } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const user = await updateUser(user_id, username, email);
        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.delete('/delete', async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const user = await deleteUser(user_id);
        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/all', async (req, res) => {
    try {
        const users = await allUsers();
        res.status(200).json(users);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/role', async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const role = await getRole(user_id);
        res.status(200).json(role);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/role', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }

        const user_id = jwt.verify(token, process.env.JWT_SECRET).user_id;
        const role = await getRole(user_id);
        res.status(200).json(role);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/userID', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json(payload.user_id);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/getName', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.sendStatus(401); }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUser(payload.user_id);
        res.status(200).json(user.username);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});



export default authRouter;
