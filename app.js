import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import mysql from 'anytv-node-mysql';
import cors from 'cors';
import expressValidator from 'express-validator';

import config from './config/config';
import passport from './config/passportConfig';
import extendRes from './helpers/resExtend';

import api from './config/apiRoutes';
import auth from './config/authRoutes';
import assets from './config/assetRoutes';
import match from './controllers/MatchController';
import pair from './controllers/PairingController';
import { makeAccept } from './controllers/PairingController';
import { toggleDiscoveryYes, clearPairs } from './controllers/UtilsController';

// Temporary helper for database cleaning
import { clearDatabase } from './controllers/DatabaseControllers';
import { validate } from './helpers/validator';


// Database Configuration!
mysql.add('master', config.MYSQL);

export const app = express();

// Config all middleware
// app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'notKeyboardCat',
    resave: false,
    saveUninitialized: true
}));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware
app.use(extendRes());


// Routes go here
app.use('/api', api);
app.use('/auth', auth);
app.use('/assets', assets);
app.get('/match', match);
app.get('/pair', pair);
app.get('/acceptall', makeAccept);
app.get('/togglediscovery', toggleDiscoveryYes);
app.get('/clearpairs', clearPairs);

if (app.get('env') === 'development') {
    app.post('/clear', clearDatabase); // Delete all elements in all tables
}

// Error handling
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if(!res.headersSent) {
        return res.status(err.status || 500).send(err);;
    }
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        if(!res.headersSent) {
            return res.status(err.status || 500).send(err);;
        }
    });
}

