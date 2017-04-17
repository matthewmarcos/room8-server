// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';
import v4 from 'uuid-v4';
import mysql from 'anytv-node-mysql';
import { hashSync, compareSync, hash, compare } from 'bcrypt-nodejs';

import * as errorType from '../helpers/errorTypes';

export const login = (req, res, next) => {
/*
    Response:
    {
        status: Number,
        user: {
            id: String,
            username: String
        }
    }
*/
    res.send({
        status: 200,
        user: req.user
    });
};


export const register = (req, res, next) =>  {
/*
    Response:
    {
        body: {
            username: String,
            username: email,
            nickname: String
        },
        message: String
    }
*/
    const { username, password, email, nickname } = req.body;
    const id = v4();

    const start = () => {
        const user = { id, username, email, nickname, password };

        mysql.use('master')
            .args(user)
            .query(
                `SELECT COUNT(*) AS count FROM user
                WHERE username = ? OR email = ?`,
                [username, email],
                hashPassword
            )
            .end();
    };

    const hashPassword = (err, result, args, lastQuery) => {
        if(result[0].count > 0) {
            return next({ status: 409, message: 'credentials taken' });
        }

        hash(password, null, null, createAccount);
    };


    const createAccount  = (err, hash) => {
        const user = { id, username, email, nickname, password: hash };

        mysql.use('master')
            .transaction()
            .query('INSERT INTO user SET ?', user, checkErrors('user'))
            .query('INSERT INTO user_preferences_lifestyle SET ?', { id }, checkErrors('user preferences lifestyle'))
            .query('INSERT INTO user_preferences_utilities SET ?', { id }, checkErrors('user preferences utilities'))
            .query('INSERT INTO user_preferences_location SET ?', { id }, checkErrors('user preferences location'))
            .query('INSERT INTO user_preferences_misc SET ?', { id }, checkErrors('user preferences misc'))
            .query('INSERT INTO user_preferences_when SET ?', { id }, checkErrors('user preferences when'))
            .query('INSERT INTO user_preferences_cost SET ?', { id }, checkErrors('user preferences cost'))
            .query('INSERT INTO user_preferences_sex SET ?', { id }, checkErrors('user preferences sex'))
            .query('INSERT INTO user_profile SET ?', { id }, checkErrors('user profile'))
            .commit(sendData);
    };

    const checkErrors = (type = 'user') => {
        return function(err, res, args, lastQuery) {
            if(err) {
                return next(errorType.tableInsertionError(type));
            }
        };
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            next(errorType.duplicateError);
        }
        else {
            res.send({
                body: { username, email, nickname },
                message: 'successfully created account'
            });
        }
    };

    start();
};


export const getProfile = (req, res, next) => {
/*
    Response:
    {
        isLoggedIn: Boolean,
        user: {
            id: String,
            username: String
        }
    }

    Response.user is null if user is not logged in
*/
    if(req.user) {
        console.log('id: ', req.user.id);
        console.log('username: ', req.user.username);
        res.status(200).send({
            isLoggedIn: true,
            user: req.user
        });
    }
    else {
        res.status(200).send({
            isLoggedIn: false,
            user: null
        });
    }

    console.log('isLoggedIn: ', !!req.user);
};


export const loggedIn = (req, res, next) => {
/*
    Pass request to next middleware if user is logged in
*/
    if(req.user) {
        return next();
    }
    else {
        return next(errorType.forbidden);
    }
};
