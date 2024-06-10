import express from 'express';
import logger from '../Middleware/logger.js';

import {
    setStudentRole,
    deleteStudent,
    getStudent,
    allStudents,
    setTutorRole,
    deleteTutor,
    getTutor,
    allTutors,
} from '../Models/role.js';

const roleRouter = express.Router();

roleRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

roleRouter.post("/student", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const student = await setStudentRole(user_id);
        res.status(201).json(student);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.delete("/student", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const student = await deleteStudent(user_id);
        res.status(200).json(student);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.get("/student", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const student = await getStudent(user_id);
        res.status(200).json(student);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.get("/allStudent", async (req, res) => {
    try {
        const student = await allStudents();
        res.status(200).json(student);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.post("/tutor", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const tutor = await setTutorRole(user_id);
        res.status(201).json(tutor);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.delete("/tutor", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const tutor = await deleteTutor(user_id);
        res.status(200).json(tutor);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.get("/tutor", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) { return res.sendStatus(400); }

        const tutor = await getTutor(user_id);
        res.status(200).json(tutor);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

roleRouter.get("/allTutor", async (req, res) => {
    try {
        const tutor = await allTutors();
        res.status(200).json(tutor);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});



export default roleRouter;