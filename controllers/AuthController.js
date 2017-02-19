// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';
import v4 from 'uuid-v4';
import mysql from 'anytv-node-mysql';
import { hashSync, compareSync, hash, compare } from 'bcrypt-nodejs';
import { getData } from '../helpers/utils'


export const loginCb = (req, res, next) => {
    res.send({
        user: req.user
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

    const id = v4();
 
    const start = () => {

        if(form instanceof Error) {
            return next({ status: 422, message: 'Unprocessable Entity'});
        }

        const { username, email, nickname, password } = form;
        const user = { id, username, email, nickname, password };

        mysql.use('master')
            .args(user)
            .query(
                `SELECT COUNT(*) AS count FROM user 
                WHERE username = ? OR email = ? OR nickname = ?`,
                [username, email, nickname],
                hashPassword
            )
            .end();
    };


    const hashPassword = (err, result, args, lastQuery) => {
        if(result[0].count > 0) {
            return next({ status: 409, message: 'credentials taken' });
        }

        hash(form.password, null, null, createAccount);
    };


    const createAccount  = (err, hash) => {
        const { username, email, nickname } = form;
        const user = { id, username, email, nickname, password: hash };

        mysql.use('master')
            .transaction()
            .query('INSERT INTO user SET ?', user, checkErrors('user'))
            .query('INSERT INTO user_preferences_lifestyle SET ?', { id }, checkErrors('user preferences lifestyle'))
            .query('INSERT INTO user_preferences_location SET ?', { id }, checkErrors('user preferences location'))
            .query('INSERT INTO user_preferences_misc SET ?', { id }, checkErrors('user preferences misc'))
            .query('INSERT INTO user_preferences_sex SET ?', { id }, checkErrors('user preferences sex'))
            .query('INSERT INTO user_preferences_utilities SET ?', { id }, checkErrors('user preferences utilities'))
            .query('INSERT INTO user_preferences_when SET ?', { id }, checkErrors('user preferences when'))
            .query('INSERT INTO user_profile SET ?', { id }, checkErrors('user profile'))
            .commit(sendData);
    };


    const checkErrors = (type = 'user') => {
        return (err, res, args, lastQuery) => {
            if(err) {
                return next({ status: 500, message: `unable to insert ${ type }` });
            }
        };
    }


    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            next({ status: 409, message: 'Duplicate entries' });
        }
        else {
            // Delete password field from form
            delete form.password;

            res.send({
                result,
                form,
                message: 'successfully created account'
            });
        }
    };


    start();
};


export const getProfile = (req, res, next) => {
    res.status(200).send({
        route: 'GET from /profile',
        user: req.user
    });
};

export const loggedIn = (req, res, next) => {
    if(req.user) {
        console.log(`${ req.user.username } is logged in with id ${ req.user.id }`);
        return next();
    }
    else {
        return next(401);
    }
};

