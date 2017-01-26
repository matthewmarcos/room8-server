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
    const form = getData({
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

        const {
             username,
             email,
             nickname,
             password
         } = form;


        const user = {
            id: v4(),
            username,
            email,
            nickname,
            password
        };


        mysql.use('master')
            .args(user)
            .query(
                `SELECT COUNT(*) AS count FROM user WHERE
                username = ? OR email = ? OR nickname = ?`,
                [username, email, nickname],
                createAccount
            )
            .end();
    };


    const createAccount = (err, result, args, lastQuery) => {

        // console.log('result: ', typeof result[0].count);
        // console.log('args: ', args);
        // console.log('lastQuery: ', lastQuery);

        if(result[0].count > 0) {
            return next({ status: 409, message: 'Duplicate entries' });
        }

        mysql.use('master')
            .query(
                'INSERT INTO user SET ?',
                args[0],
                sendData
            )
            .end();
    };


    const sendData = (err, result, args, lastQuery) => {

        if(err) {
            next({ status: 409 });
        }
        else {
            res.send({ message: form });
        }
    };


    start();

};


export const profile = (req, res, next) => {
    res.status(200).send({
        route: '/profile'
    });
};

