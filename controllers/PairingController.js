import _ from 'lodash';
import async from 'async';
import mysql from 'anytv-node-mysql';
import { toCamelCase, toSnakeCase } from 'case-converter';
import makeArray from 'number-array-generator';
import * as fuzz from 'fuzzball';

import * as errorTypes from '../helpers/errorTypes';
import { resourceNotFound } from '../helpers/errorTypes'


export default function galeShapely(req, res, next) {

    let needRoom = [];
    let hasRoom = [];
    /*
     * 1. Get all the pairs
     * 2. Separate users who want room from those who have a room
     * 3. Map the scores and userids (and usernames for easy debugging)
     * 4. Get resulting pairs
     */

    function start() {
        const query = `
            SELECT id, username, status
            FROM user NATURAL JOIN user_matches

        `;
        async.parallel([
            function(callback) {
                // 'I am looking for a room'
                mysql.use('master')
                    .args(callback)
                    .query(query, [ 'I am looking for a room' ], collectArray)
                    .end();
            },
            function(callback) {
                // 'I have a room'
                mysql.use('master')
                    .args(callback)
                    .query(query, [ 'I have a room' ], collectArray)
                    .end();
            }
        ], loopData);
    }


    function collectArray(err, results, args, lastQuery) {
        const callback = args[0];

        if(err) {
            return callback(resourceNotFound, null);
        }

        callback(null, results);
    }


    function loopData(err, result) {
        if(err) {
            return next(err);
        }

        needRoom = toCamelCase(result[0]);
        hasRoom = toCamelCase(result[1]);

        res.send({
            message: 'Gale-Shapelys algo gonna execute here',
            hasRoom, needRoom
        });
    }


    start();
}


export function makeAccept(req, res, next) {
    /*
     * Flags all 1accept2 and 2accept1 as Accept in user_matches table
     */
    const query = `UPDATE user_matches SET 1accept2='Accept', 2accept1='Accept'`;

    function start() {
        mysql.use('master')
            .query(query, sendData)
            .end();
    }


    function sendData(err, response, args, lastQuery) {
        if(err) {
            console.error(err);
            return next(errorTypes.genericError('Making Accept', {
                lastQuery,
                err
            }));
        }


        res.send({
            message: 'Successfully marked all as yes',
            response,
            lastQuery
        });
    }

    start();
}
