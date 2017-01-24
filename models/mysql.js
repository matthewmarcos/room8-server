import mysql from 'mysql';
import config from '../config/config';
import v4 from 'uuid-v4';

const { MYSQL } = config;
const pool = mysql.createPool(MYSQL);

// http://stackoverflow.com/questions/18496540/node-js-mysql-connection-pooling
const getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        callback(err, connection);
    });
};

console.log('mysql is here');

export default getConnection;
