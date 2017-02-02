import express from 'express';
import path from 'path';
import fs from 'fs';
import * as auth from '../controllers/AuthController';
import passport from 'passport';

const router = express.Router();

// Logs the user in if they exist
router.post('/login', passport.authenticate('local'), auth.loginCb);

router.post('/logout', auth.loggedIn, (req, res, next) => {
    const username = req.user.username;
    req.logout();
    res.send({
        message: 'Successfully Logged out'
    });
});

// This route creates a new account
router.post('/register', auth.register);

// This route asks checks if user is logged in 
router.get('/profile', auth.loggedIn, auth.getProfile);

export default router;
