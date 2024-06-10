import pool from '../Config/db.js';
import bcrypt from 'bcryptjs';

const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await pool.query(
        'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email',
        [username, email, hashedPassword]
    );
    return newUser.rows[0];
};

// GET USER BY ID
const getUser = async (user_id) => {
    const result = await pool.query(
        'SELECT * FROM "user" WHERE user_id = $1',
        [user_id]
    );
    return result.rows[0];
}

// FIND USER BY USERNAME
const findUser = async (username) => {
    const result = await pool.query(
        'SELECT user_id, username, email, password FROM "user" WHERE username = $1',
        [username]
    );
    return result.rows[0];
};

const updateUser = async (user_id, username, email) => {
    const result = await pool.query(
        'UPDATE "user" SET username = $2, email = $3 WHERE user_id = $1 RETURNING user_id, username, email',
        [user_id, username, email]
    );
    return result.rows[0];
};

const checkEmailDupe = async (email) => {
    const result = await pool.query(
        'SELECT user_id, username, email FROM "user" WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

const deleteUser = async (user_id) => {
    const result = await pool.query(
        'DELETE FROM "user" WHERE user_id = $1 RETURNING user_id, username',
        [user_id]
    );
    return result.rows[0];
};

const getRole = async (user_id) => {
    const result = await pool.query(
        `SELECT 
                CASE 
                    WHEN EXISTS (SELECT 1 FROM student WHERE user_id = $1) THEN 'student' 
                    WHEN EXISTS (SELECT 1 FROM tutor WHERE user_id = $1) THEN 'tutor' 
                    WHEN EXISTS (SELECT 1 FROM admin WHERE user_id = $1) THEN 'admin' 
                    WHEN EXISTS (SELECT 1 FROM "user" WHERE user_id = $1) THEN 'user'
                    ELSE 'unknown' 
                END AS role`,
        [user_id]
    );
    return result.rows[0]['role'];
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

//ALL
const allUsers = async () => {
    const result = await pool.query(
        'SELECT * FROM "user"'
    );
    return result.rows;
}

export {
    registerUser,
    getUser,
    findUser,
    updateUser,
    checkEmailDupe,
    deleteUser,
    getRole,
    comparePassword,
    allUsers,
};
