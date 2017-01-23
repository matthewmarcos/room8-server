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

// getConnection((err, conn) => {
    // if(err) {
        // console.error(err);
        // throw err;
    // }
    // const user = {
        // id: v4(),
        // username: `SampleUser ${v4()}`.slice(0, 21),
        // password: 'password'
    // };

    // conn.query('INSERT INTO user SET ?', user, (err, data, fields) => {
        // if(err) {
            // throw err;
        // }

        // console.log(data, fields);
        // conn.release();
    // });
// });

export default getConnection;
