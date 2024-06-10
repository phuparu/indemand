import pool from '../Config/db.js';

const newCourse = async (course_id, course_name, description, tutor_id) => {
    const course = await pool.query(
        'INSERT INTO course (course_id, name, description, tutor_id) VALUES ($1, $2, $3, $4) RETURNING course_id, name, tutor_id, description',
        [course_id, course_name, description, tutor_id]
    );
    return course.rows[0];
};

const findCourse = async (course_id) => {
    const course = await pool.query(
        'SELECT * FROM course WHERE course_id = $1',
        [course_id]
    );
    return course.rows[0];
};

const updateCourse = async (course_id, course_name, description, tutor_id) => {
    const course = await pool.query(
        'UPDATE course SET name = $2, description = $3, tutor_id = $4 WHERE course_id = $1 RETURNING course_id, course_name, description, tutor_id',
        [course_id, course_name, description, tutor_id]
    );
    return course.rows[0];
};

const deleteCourse = async (course_id) => {
    const course = await pool.query(
        'DELETE FROM course WHERE course_id = $1 RETURNING course_id, course_name',
        [course_id]
    );
    return course.rows[0];
};

//FRONTEND

const viewCourses = async () => {
    const courses = await pool.query(
        'SELECT course_id as id, course.name as name, description, (SELECT "user".name as tutor_name FROM "user" WHERE "user".user_id = course.tutor_id) FROM course'
    );
    return courses.rows;
};

const selectCoursesByTutor = async (tutor_id) => {
    const courses = await pool.query(
        'SELECT * FROM course WHERE tutor_id = $1',
        [tutor_id]
    );
    return courses.rows;
};

//ALL

const allCourses = async () => {
    const courses = await pool.query(
        'SELECT * FROM course'
    );
    return courses.rows;
};

export {
    newCourse,
    findCourse,
    updateCourse,
    deleteCourse,
    viewCourses,
    selectCoursesByTutor,
    allCourses,
};