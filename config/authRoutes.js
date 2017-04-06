import fs from 'fs';
import path from 'path';
import express from 'express';
import passport from 'passport';

import * as parameterTypes from '../helpers/parameterTypes';
import { validate } from '../helpers/validator';
import * as auth from '../controllers/AuthController';

const router = express.Router();

// Logs the user in if they exist
router.post('/login', passport.authenticate('local'), auth.loginCb);

router.post('/logout', auth.loggedIn, (req, res, next) => {
    const { username } = req.user;

    req.logout();
    res.send({
        message: 'Successfully Logged out'
    });
});

// This route creates a new account
router.post('/register',
    validate(parameterTypes.register, 'body'),
    auth.register
);

// This route asks checks if user is logged in
router.get('/profile', auth.loggedIn, auth.getProfile);

export default router;
