import mysql from 'anytv-node-mysql';
import * as errorTypes from '../helpers/errorTypes';
import { toSnakeCase } from 'case-converter'


export function prefWhen (req, res, next) {
    const { user, body } = req;

    const start = () => {
        let start_date = Date.parse(body.startDate);
        const duration = body.duration;

        if(isNaN(start_date)) {
            return next(errorTypes.validationError);
        }
        else {
            start_date = new Date(body.startDate);
            const insertData = { start_date, duration };

            mysql.use('master')
                .query(
                    `UPDATE user_preferences_when SET ? WHERE id=?`,
                    [ insertData, user.id ],
                    sendData
                )
                .end();
        }
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError)
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully when preferences',
                path: req.path,
                user
            });
    }

    start();
}


export function prefUtilities (req, res, next) {
    const { user, body } = req;

    const start = () => {
        const insertData = toSnakeCase(body);
        mysql.use('master')
            .query(
                `UPDATE user_preferences_utilities SET ? WHERE id=?`,
                [ insertData, user.id ],
                sendData
            )
            .end();
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully updated utility preferences',
                path: req.path,
                user
            });
    }

    start();
}


export function prefLifestyle (req, res, next) {
    const { user } = req;

    res.status(200)
        .send({
            status: 200,
            message: 'Ang gwapo mo talaga',
            path: req.path,
            user
        });
}


export function prefLocation (req, res, next) {
    const { user } = req;

    res.status(200)
        .send({
            status: 200,
            message: 'Ang gwapo mo talaga',
            path: req.path,
            user
        });
}


export function prefMisc (req, res, next) {
    const { user } = req;

    res.status(200)
        .send({
            status: 200,
            message: 'Ang gwapo mo talaga',
            path: req.path,
            user
        });
}


export function prefCost (req, res, next) {
    const { user } = req;

    res.status(200)
        .send({
            status: 200,
            message: 'Ang gwapo mo talaga',
            path: req.path,
            user
        });
}


/*
 * tableName comes from the application and not the user so there is no need to check for malicious stuff
 */
export const get = (tableName) => {
    const _getData = (query) => {
        return (req, res, next) => {
            const { id } = req.user;

            const start = () => {
                mysql.use('master')
                    .query(
                        query, [id], sendResponse
                    )
                    .end();
            };

            const sendResponse = (err, result, args, lastQuery) => {
                res.send({
                    result: result[0],
                    id
                });
            };

            start();
        };
    };

    const query = tableName ?
        `SELECT * from user_preferences_${ tableName } WHERE id = ?;`:
        `SELECT * from user
            NATURAL JOIN user_preferences_lifestyle
            NATURAL JOIN user_preferences_location
            NATURAL JOIN user_preferences_misc
            NATURAL JOIN user_preferences_sex
            NATURAL JOIN user_preferences_utilities
            NATURAL JOIN user_preferences_when
            WHERE id = ?;
        `;
    return _getData(query);
};
