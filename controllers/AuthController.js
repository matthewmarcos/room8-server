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
            return next({ status: 422, message: 'Unprocessable Entity'});
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
                `SELECT COUNT(*) AS count FROM user 
                WHERE username = ? OR email = ? OR nickname = ?`,
                [username, email, nickname],
                createAccount
            )
            .end();
    };


    const createAccount = (err, result, args, lastQuery) => {
        const userId = {
            id: args[0].id
        };

        if(result[0].count > 0) {
            return next({ status: 409, message: 'credentials taken' });
        }

        mysql.use('master')
            .transaction()
            .query('INSERT INTO user SET ?', args[0], checkUser)
            .query('INSERT INTO user_preferences_lifestyle SET ?', userId, checkPreferencesLifestyle)
            .query('INSERT INTO user_preferences_location SET ?', userId, checkPreferencesLocation)
            .query('INSERT INTO user_preferences_misc SET ?', userId, checkPreferencesMisc)
            .query('INSERT INTO user_preferences_sex SET ?', userId, checkPreferencesSex)
            .query('INSERT INTO user_preferences_utilities SET ?', userId, checkPreferencesUtilities)
            .query('INSERT INTO user_preferences_when SET ?', userId, checkPreferencesWhen)
            .query('INSERT INTO user_profile SET ?', userId, checkUserProfile)
            .commit(sendData);
    };


    const checkUser = (err, res, args, lastQuery) => {
        if(err) {
            return next({ status: 500, message: 'unable to insert user' });
        }
    }


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
            return next({ status: 501, message: 'unable to insert user preferences when' });
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
            res.send({ 
                result,
                form,
                message: 'successfully created account',
            });
        }
    };


    start();
};


export const profile = (req, res, next) => {
    res.status(200).send({
        route: '/profile'
    });
};

