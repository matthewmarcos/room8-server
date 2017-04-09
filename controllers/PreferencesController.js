import mysql from 'anytv-node-mysql';
import { getData } from '../helpers/utils'
import errorTypes from '../helpers/errorTypes';


export function prefWhen (req, res, next) {
    const { user } = req;

    res.status(200)
        .send({
            status: 200,
            message: 'Ang gwapo mo talaga',
            path: req.path,
            user
        });
}


export function prefUtilities (req, res, next) {
    const { user } = req;

    res.status(200)
        .send({
            status: 200,
            message: 'Ang gwapo mo talaga',
            path: req.path,
            user
        });
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
                    // method: req.method,
                    result: result[0],
                    lastQuery,
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
