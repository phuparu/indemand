import pool from '../Config/db.js';

const newBooking = async (student_id, course_id, date, start_time, end_time) => {
    const startTimestamp = `${date} ${start_time}`;
    const endTimestamp = `${date} ${end_time}`;

    const booking = await pool.query(
        `INSERT INTO session ( student_id, course_id, timerange) VALUES ($1, $2, tsrange($3::timestamp, $4::timestamp)) RETURNING session_id, student_id, course_id, timerange`,
        [student_id, course_id, startTimestamp, endTimestamp]
    );
    return booking.rows[0];
}

const checkForOverlap = async (course_id, date, start_time, end_time) => {
    const startTimestamp = `${date} ${start_time}`;
    const endTimestamp = `${date} ${end_time}`;

    const overlap = await pool.query(
        `SELECT * FROM session WHERE course_id = $1 AND timerange && tsrange($2::timestamp, $3::timestamp)`,
        [course_id, startTimestamp, endTimestamp]
    );
    return overlap.rows;
}

const getTutorBooking = async (tutor_id) => {
    const booking = await pool.query(
        `SELECT session_id, course_id, student_id, status, feedback, to_char(lower(timerange), 'DD/MM/YYYY HH12:MIAM') || ' - ' || to_char(upper(timerange), 'HH12:MIAM') AS timerange,   to_char(lower(timerange), 'MM/DD/YYYY') AS date,  to_char(lower(timerange), 'HH12:MIAM') AS start_time, to_char(upper(timerange), 'HH12:MIAM') AS end_time FROM session  WHERE course_id IN (SELECT course_id FROM course WHERE tutor_id = $1) ;`,
        [tutor_id]
    );
    return booking.rows;
}

const updateBooking = async (session_id, status, feedback, date, start_time, end_time) => {
    const startTimestamp = `${date} ${start_time}:00`;
    const endTimestamp = `${date} ${end_time}:00`;

    const booking = await pool.query(
        `UPDATE session SET status = $2, feedback = $3, timerange = tsrange($4::timestamp, $5::timestamp) WHERE session_id = $1 RETURNING session_id, student_id, course_id, timerange`,
        [session_id, status, feedback, startTimestamp, endTimestamp]
    );
    return booking.rows[0];
}

export {
    newBooking,
    checkForOverlap,
    getTutorBooking,
    updateBooking,
};