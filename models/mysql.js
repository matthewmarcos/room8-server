import mysql from 'mysql';
import config from '../config/config';
import v4 from 'uuid-v4';

const { MYSQL } = config;

console.log('config: ', MYSQL);

const pool = mysql.createPool(MYSQL);

pool.getConnection((err, conn) => {
    if(err) {
        console.error(err);
        throw err;
    }
    const user = {
        id: v4(),
        username: `SampleUser ${v4()}`.slice(0, 21),
        password: 'password'
    };

    console.log('YEAHHHH');

    conn.query('INSERT INTO user SET ?', user, function(err, data, fields) {
        if(err) {
            throw err;
        }

        console.log(data, fields);
    });
});

export default pool;
