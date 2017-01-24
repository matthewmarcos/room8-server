import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';

import api from './config/apiRoutes';
import auth from './config/authRoutes';
import assets from './config/assetRoutes';
import config from './config/config';

import mysql from 'anytv-node-mysql';

export const app = express();

// Config all middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'notKeyboardCat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes go here
app.use('/api', api);
app.use('/auth', auth);
app.use('/assets', assets);

// Error handling
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.sendStatus(err.status || 500);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err);
        res.sendStatus(err.status || 500);
    });
}

// Extra Database Configuration!
mysql.add('master', config.MYSQL);

