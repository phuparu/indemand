import pool from "../Config/db.js";

const setStudentRole = async (user_id) => {
    const result = await pool.query(
        `INSERT INTO student (user_id) VALUES ($1) RETURNING user_id`,
        [user_id]
    )
    return result.rows[0];
};

const deleteStudent = async (user_id) => {
    const result = await pool.query(
        `DELETE FROM student WHERE user_id = $1 RETURNING user_id`,
        [user_id]
    );
    return result.rows[0];
};

const getStudent = async (user_id) => {
    const result = await pool.query(
        `SELECT user_id, school, grade_level FROM student WHERE user_id = $1`,
        [user_id]
    );
    return result.rows[0];
};

const allStudents = async () => {
    const result = await pool.query(
        'SELECT student.*, u.user_id, u.username, u.email, u.name, u.gender, u.birthdate, u.image FROM student JOIN "user" AS u ON student.user_id = u.user_id;'
    );
    return result.rows;
};

const setTutorRole = async (user_id) => {
    const result = await pool.query(
        `INSERT INTO tutor (user_id) VALUES ($1) RETURNING user_id`,
        [user_id]
    )
    return result.rows[0];
};

const deleteTutor = async (user_id) => {
    const result = await pool.query(
        `DELETE FROM tutor WHERE user_id = $1 RETURNING user_id`,
        [user_id]
    );
    return result.rows[0];
};

const getTutor = async (user_id) => {
    const result = await pool.query(
        `SELECT user_id, biography FROM tutor WHERE user_id = $1`,
        [user_id]
    );
    return result.rows[0];
};

const allTutors = async () => {
    const result = await pool.query(
        'SELECT tutor.*, u.user_id, u.username, u.email, u.name, u.gender, u.birthdate, u.image FROM tutor JOIN "user" AS u ON tutor.user_id = u.user_id;'
    );
    return result.rows;
};

const setAdminRole = async (user_id) => {
    const result = await pool.query(
        `INSERT INTO admin (user_id) VALUES ($1) RETURNING user_id`,
        [user_id]
    );
    return result.rows[0];
};

const deleteAdmin = async (user_id) => {
    const result = await pool.query(
        `DELETE FROM admin WHERE user_id = $1 RETURNING user_id`,
        [user_id]
    );
    return result.rows[0];
};

//FRONTEND

export {
    setStudentRole,
    deleteStudent,
    getStudent,
    allStudents,
    setTutorRole,
    deleteTutor,
    getTutor,
    allTutors,
    setAdminRole,
    deleteAdmin,
};