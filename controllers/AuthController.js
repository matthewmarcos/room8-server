// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';
import getConnection from '../models/mysql.js';
import v4 from 'uuid-v4';


export const login = (req, res, next) => {
    res.status(200).send({
        something: 'hello'
    });
};


export const register = (req, res, next) =>  {

    getConnection((err, conn) => {
        if(err) {
            console.error(err);
            throw err;
        }
        const user = {
            id: v4(),
            username: `SampleUser ${v4()}`.slice(0, 21),
            password: 'password'
        };

        conn.query('INSERT INTO user SET ?', user, (err, data, fields) => {
            if(err) {
                throw err;
            }

            conn.release();
            res.send({ data });
        });
    });

}


export const profile = (req, res, next) => {
    res.status(200).send({
        something: 'profile'
    });
};
