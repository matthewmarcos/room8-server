import express from 'express';
import path from 'path';
import fs from 'fs';
import * as auth from '../controllers/AuthController';

const router = express.Router();

router.post('/login', auth.login);

// This route creates a new account
router.post('/register', auth.register);

// This route asks checks if user is logged in 
router.get('/profile', (req, res, next) =>  {
    res.send({something: '!Working profile!'});
});

export default router;
