import express from 'express';

const router = express.Router();

// This route logs the user in 
router.post('/login', function(req, res, next) {
    res.send({something: '!Working login!'});
});

// This route creates a new account
router.post('/register', function(req, res, next) {
    res.send({something: '!Working register!'});
});

// This route asks checks if user is logged in 
router.post('/profile', function(req, res, next) {
    res.send({something: '!Working profile!'});
});

export default router;
