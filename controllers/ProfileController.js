import mysql from 'anytv-node-mysql';
import * as errorTypes from '../helpers/errorTypes';
import { toSnakeCase } from 'case-converter';
import _ from 'lodash';


export function getProfile(req, res, next) {
    const { user } = req;
    const { id } = user;

    const start = () => {
        const query = `
            SELECT * FROM user
                NATURAL JOIN user_profile
            WHERE id = ?;
        `;

        mysql.use('master')
            .query( query, [ id ], sendData)
            .end();

    };

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        let toSend = result[0];
        delete toSend.password;

        res.status(200)
            .send({
                status: 200,
                message: 'GET /profile',
                user: toSend
            });
    };

    start();
}


export function editProfile(req, res, next) {
    const { user } = req;

    const start = () => {
        res.status(200)
            .send({
                status: 200,
                message: 'PUT Profile Route here',
                user
            });
    };

    const sendData = (err, result, args, lastQuery) => {

    };

    start();
}
