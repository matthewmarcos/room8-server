// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';
import v4 from 'uuid-v4';
import mysql from 'anytv-node-mysql';
import { hashSync, compareSync, hash, compare } from 'bcrypt-nodejs';
import { getData } from '../helpers/utils'

export const login = (req, res, next) => {
    const form = getData({
            username: '',
            password: ''
        })
        .from(req.body);

    const start = () => {
        const { username, password } = form;

        mysql.use('master')
            .args(compare, password)
            .query(
                `SELECT id, username, password FROM user WHERE username = ?`,
                [username],
                checkLogin
            )
            .end();
    };


    const checkLogin = (err, result, args, lastQuery) => {
        if(result.length !== 1) {
            next({ status: 422, message: 'Could not log in' });
        }

        console.log(result);

        args[0](args[1], result[0].password, sendResponse);
    };


    const sendResponse = (err, isValidPassword) => {
        res.status(200).send({
            route: '/login',
            isValidPassword
        });
    };


    start();
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
            .query('INSERT INTO user SET ?', user, checkUser)
            .query('INSERT INTO user_preferences_lifestyle SET ?', { id }, checkPreferencesLifestyle)
            .query('INSERT INTO user_preferences_location SET ?', { id }, checkPreferencesLocation)
            .query('INSERT INTO user_preferences_misc SET ?', { id }, checkPreferencesMisc)
            .query('INSERT INTO user_preferences_sex SET ?', { id }, checkPreferencesSex)
            .query('INSERT INTO user_preferences_utilities SET ?', { id }, checkPreferencesUtilities)
            .query('INSERT INTO user_preferences_when SET ?', { id }, checkPreferencesWhen)
            .query('INSERT INTO user_profile SET ?', { id }, checkUserProfile)
            .commit(sendData);
    };


    const checkUser = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user' });
        }
    };


    const checkPreferencesLifestyle = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user preferences lifestyle' });
        }
    }


    const checkPreferencesLocation = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user preferences location' });
        }
    }


    const checkPreferencesMisc = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user preferences misc' });
        }
    }


    const checkPreferencesSex = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user preferences sex' });
        }
    }


    const checkPreferencesUtilities = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user preferences utilities' });
        }
    }


    const checkPreferencesWhen = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user preferences when' });
        }
    }


    const checkUserProfile = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user profile' });
        }
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
        route: 'GET from /profile'
    });
};

