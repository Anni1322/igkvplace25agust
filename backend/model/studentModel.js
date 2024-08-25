const { pool } = require('../config/db');

async function getUsers() {
    try {
        const result = await pool.query('SELECT * FROM Users');
        return result.recordset;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

module.exports = {
    getUsers
};
