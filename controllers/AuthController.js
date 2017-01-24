// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';
import getConnection from '../models/mysql.js';
import v4 from 'uuid-v4';
import mysql from 'anytv-node-mysql';


export const login = (req, res, next) => {
    res.status(200).send({
        something: 'hello'
    });
};


export const register = (req, res, next) =>  {

    const start = () => {

        const user = {
            id: v4(),
            username: `SampleUser ${v4()}`.slice(0, 21),
            password: 'password'
        };

        mysql.use('master')
            .query(
                'INSERT INTO user SET ?',
                user,
                sendData
            )
            .end();
    };


    const sendData = (err, data, args, lastQuery) => {
        console.log('err', err);

        if(err) {
            console.error(err);
            throw err;
        }

        console.log('data', data);
        console.log('args', args);
        console.log('lastQuery', lastQuery);

        res.send({data});
    };


    start();

};


export const profile = (req, res, next) => {
    res.status(200).send({
        something: 'profile'
    });
};

