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

    function getQuery(column) { 

        let col1, col2;
        if(column === 'need_room') {
            col1 = 'need_room';
            col2 = 'has_room';
        }
        else if(column === 'has_room') {
            col1 = 'has_room';
            col2 = 'need_room';
        }
        return `
            SELECT
                a.id AS id1,
                c.id AS id2,
                a.username AS username1,
                c.username AS username2,
                total_score,
                1accept2,
                2accept1
            FROM user AS a
            INNER JOIN user_matches 
            ON a.id=${ col1 }
            INNER JOIN user AS c 
            ON c.id=${ col2 }
            WHERE 1accept2='Accept'
            AND 2accept1='Accept' `.replace(/\n/g, "").replace(/[ ]+/g, " ");
    }

    function start() {
    /*
     * 1. Get all the pairs
     * 2. Separate users who want room from those who have a room
     * 3. Map the scores and userids (and usernames for easy debugging)
     * 4. Get resulting pairs
     */
        async.parallel([
            function(callback) {
                // 'I am looking for a room'
                mysql.use('master')
                    .args(callback)
                    .query(getQuery('need_room'), collectArray)
                    .end();
            },
            function(callback) {
                // 'I have a room'
                mysql.use('master')
                    .args(callback)
                    .query(getQuery('has_room'), collectArray)
                    .end();
            }
        ], loopData);
    }


    function collectArray(err, results, args, lastQuery) {
        const callback = args[0];

        if(err) {
            console.error(err)
            return next(errorTypes.genericError('Making Accept', {
                lastQuery,
                err
            }));
        }

        callback(null, results);
    }


    function loopData(err, result) {
        if(err) {
            return next(err);
        }

        needRoom = toCamelCase(result[0]);
        hasRoom = toCamelCase(result[1]);

        const needRoomById = _.chain(needRoom).groupBy('username1').mapValues(x => _.sortBy(x, 'totalScore').reverse()).value();
        const hasRoomById = _.chain(hasRoom).groupBy('username1').mapValues(x => _.sortBy(x, 'totalScore').reverse()).value();
        // const hasRoomById = _.groupBy(hasRoom, 'id1');

        res.send({
            message: 'Gale-Shapelys algo gonna execute here',
            needRoomById, hasRoomById
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
