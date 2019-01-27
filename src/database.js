const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (connection) {
        connection.release();
        console.log('Database connected');
    } else {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS LOST');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED') {
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }
});
// promisify pool queries
pool.query = promisify(pool.query);
module.exports = pool;