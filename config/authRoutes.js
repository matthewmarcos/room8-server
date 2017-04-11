import fs from 'fs';
import path from 'path';
import express from 'express';
import passport from 'passport';

import * as parameterTypes from '../helpers/parameterTypes';
import { validate } from '../helpers/validator';
import * as auth from '../controllers/AuthController';

const router = express.Router();

/*
    Logs the user in if they exist
    - username: String
    - password: String
*/
router.post('/login', passport.authenticate('local'), auth.login);

router.post('/logout', auth.loggedIn, (req, res, next) => {
    const { username } = req.user;

    req.logout();
    res.send({
        status: 200,
        message: `${username} successfully logged out`
    });
});

/*
    This route creates a new account
    username: String
    password: String
    email: String
    nickname: String
*/
router.post('/register',
    validate(parameterTypes.register, 'body'),
    auth.register
);

// This route asks checks if user is logged in
router.get('/profile', auth.getProfile);

export default router;
