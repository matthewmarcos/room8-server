import mysql from 'anytv-node-mysql';
import passport from 'passport';
import { compare } from 'bcrypt-nodejs';

import errorTypes from '../helpers/errorTypes';


const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        const start = () => {
            mysql.use('master')
                .args(password)
                .query(
                    `SELECT id, username, password FROM user WHERE username = ?`,
                    [username],
                    checkLogin
                )
                .end();
        };


        const checkLogin = (err, result, args, lastQuery) => {
            if(err) {
                return done(err);
            }

            if(result.length !== 1) {
                done(null, false, errorTypes.validationError);
            }
            else {
                compare(args[0], result[0].password, sendResponse.bind(this, result[0]));
            }

        };


        const sendResponse = (userData, err, isValidPassword) => {
            if(err) {
                return done(err);
            }

            const user = {
                id: userData.id,
                username: userData.username
            };

            if(isValidPassword) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'invalid user!' });
            }
        };

        start();
    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    function start() {
        mysql.use('master')
            .query(`SELECT id, username FROM user WHERE id = ?`, [id], sendData)
            .end();
    }

    function sendData(err, result, args, lastQuery) {
        if(err) {
            return done(err);
        }

        const user = {
            id: result[0].id,
            username: result[0].username
        };

        return done(null, user);
    }

    start();
});

export default passport;

