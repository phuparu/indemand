import pool from '../Config/db.js';

const updateProfile = async (user_id, username, email, name, gender, birthdate, image) => {
    const result = await pool.query(
        'UPDATE "user" SET username = $2, email = $3, firstname = $4, gender = $5, birthdate = $6, image = $7 WHERE user_id = $1 RETURNING user_id, username, email, name, gender, birthdate, image',
        [user_id, username, email, name, gender, birthdate, image]
    );
    return result.rows[0];
};

const updateTutorProfile = async (user_id, name, email, biography) => {
    const result = await pool.query(
        'UPDATE "user" SET name = $2, email = $3 WHERE user_id = $1;',
        [user_id, name, email]
    );
    const result2 = await pool.query(
        'UPDATE tutor SET biography = $2 WHERE user_id = $1 RETURNING user_id, biography',
        [user_id, biography]
    );
    return result2.rows[0];
};

const getProfile = async (user_id) => {
    const result = await pool.query(
        'SELECT user_id, username, email, name, gender, birthdate, image FROM "user" WHERE user_id = $1',
        [user_id]
    );
    return result.rows[0];
};

const getStudentProfile = async (user_id) => {
    const result = await pool.query(
        `SELECT u.user_id, u.username, u.name, u.email, u.gender, TO_CHAR(u.birthdate, 'DD Mon YYYY') as birthdate , u.image, s.school, s.grade_level FROM "user" u JOIN student s ON s.user_id = u.user_id WHERE u.user_id = $1`,
        [user_id]
    );
    return result.rows[0];
};

const getTutorProfile = async (user_id) => {
    const result = await pool.query(
        `SELECT u.user_id, u.username, u.name, u.email, u.gender, u.birthdate, u.image, t.biography, (SELECT array_agg(course_id) as courses FROM course WHERE course.tutor_id = t.user_id) FROM "user" u JOIN tutor t ON t.user_id = u.user_id WHERE u.user_id = $1`,
        [user_id]
    );
    return result.rows[0];
};
const getName = async (user_id) => {
    const result = await pool.query(
        'SELECT name FROM "user" WHERE user_id = $1',
        [user_id]
    );
    return result.rows[0];
};

export {
    updateProfile,
    updateTutorProfile,
    getProfile,
    getStudentProfile,
    getTutorProfile,
    getName,
};