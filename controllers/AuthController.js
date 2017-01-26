// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';
import v4 from 'uuid-v4';
import mysql from 'anytv-node-mysql';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import { getData } from '../helpers/utils'

export const login = (req, res, next) => {
    res.status(200).send({
        route: '/login'
    });
};


export const register = (req, res, next) =>  {

    const form = getData(next, {
            username: '',
            password: '',
            email: '',
            nickname: ''
        })
        .from(req.body);

    const start = () => {

        if (form instanceof Error) {
            return next({ status: 422 });
        }

        const user = {
            id: v4(),
            username: `SampleUser ${v4()}`.slice(0, 21),
            email: `yeah@yeah.com ${v4().slice(0,10)}`,
            nickname: `nickname`,
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

        if(err) {
            next(err);
        }

        res.send({ message: form });
    };


    start();

};


export const profile = (req, res, next) => {
    res.status(200).send({
        route: '/profile'
    });
};

