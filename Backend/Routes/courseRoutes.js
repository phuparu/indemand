import express from 'express';
import logger from '../Middleware/logger.js';

import {
    newCourse,
    findCourse,
    updateCourse,
    deleteCourse,
    viewCourses,
    selectCoursesByTutor,
    allCourses,
} from '../Models/course.js';

const courseRouter = express.Router();

courseRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

courseRouter.post('/new', async (req, res) => {
    try {
        const { course_id, course_name, description, tutor_id } = req.body;
        if (!course_id) { return res.sendStatus(400); }

        const course = await newCourse(course_id, course_name, description, tutor_id);
        res.status(201).json(course);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.get('/find', async (req, res) => {
    try {
        const { course_id } = req.body;
        if (!course_id) { return res.sendStatus(400); }

        const course = await findCourse(course_id);
        res.status(200).json(course);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.get('/view', async (req, res) => {
    try {
        const courses = await viewCourses();
        res.status(200).json(courses);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.post('/update', async (req, res) => {
    try {
        const { course_id, course_name, description, tutor_id } = req.body;
        if (!course_id) { return res.sendStatus(400); }

        const course = await updateCourse(course_id, course_name, description, tutor_id);
        res.status(200).json(course);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.delete('/delete', async (req, res) => {
    try {
        const { course_id } = req.body;
        if (!course_id) { return res.sendStatus(400); }

        const course = await deleteCourse(course_id);
        res.status(200).json(course);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.get('/view', async (req, res) => {
    try {
        const courses = await viewCourses();
        res.status(200).json(courses);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.get('/find/:course_id', async (req, res) => {
    try {
        const { course_id } = req.params;
        if (!course_id) { return res.sendStatus(400); }

        const course = await findCourse(course_id);
        res.status(200).json(course);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.get('/selectByTutor', async (req, res) => {
    try {
        const { tutor_id } = req.body;
        if (!tutor_id) { return res.sendStatus(400); }

        const courses = await selectCoursesByTutor(tutor_id);
        res.status(200).json(courses);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

courseRouter.get('/all', async (req, res) => {
    try {
        const courses = await allCourses();
        res.status(200).json(courses);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

export default courseRouter;