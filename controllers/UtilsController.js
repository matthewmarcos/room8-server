import mysql from 'anytv-node-mysql';
import * as errorTypes from '../helpers/errorTypes';
import { toSnakeCase } from 'case-converter';
import _ from 'lodash';

export function toggleDiscoveryYes(req, res, next) {
    const queryString = `
        UPDATE user_profile SET match_me = 1;
    `;

    function start() {
        mysql.use('master')
            .query(queryString, sendData)
            .end();
    }

    function sendData(err, response, args, lastQuery) {
        if(err) {
            console.error(err);
            return next(errorTypes.generalError('Error updating match_me', err))
        }

        res.send({
            message: 'Finished! updating match_me',
            response
        });
    }

    start();
}

export function clearPairs(req, res, next) {
    const queryString = `
        DELETE FROM user_pairs;
    `;

    function start() {
        mysql.use('master')
            .query(queryString, sendData)
            .end();
    }

    function sendData(err, response, args, lastQuery) {
        if(err) {
            console.error(err);
            return next(errorTypes.generalError('Error updating match_me', err))
        }

        res.send({
            message: 'Finished! updating match_me',
            response
        });
    }

    start();
}
