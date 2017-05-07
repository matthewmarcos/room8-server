import _ from 'lodash';
import async from 'async';
import mysql from 'anytv-node-mysql';
import { toCamelCase, toSnakeCase } from 'case-converter';
import makeArray from 'number-array-generator';
import * as fuzz from 'fuzzball';
import { isArray } from 'typechecker';

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
        ], processData);
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


    function processData(err, result) {
        if(err) {
            console.error(err)
            return next(errorTypes.genericError('Looping data', {
                lastQuery,
                err
            }));
        }

        needRoom = toCamelCase(result[0]);
        hasRoom = toCamelCase(result[1]);


        const needRoomByUsername = _.chain(needRoom).groupBy('username1').mapValues(x => _.sortBy(x, 'totalScore').reverse()).value();
        const hasRoomByUsername = _.chain(hasRoom).groupBy('username1').mapValues(x => _.sortBy(x, 'totalScore').reverse()).value();

        const usersNeedRoom = Object.keys(needRoomByUsername);
        const usersHaveRoom = Object.keys(hasRoomByUsername);
        const scores = _.mapValues(needRoomByUsername, (user) => {
            return _.chain(user)
                .groupBy(potentialPartner => potentialPartner.username2)
                .mapValues(x => x[0].totalScore)
                .value();
        });

        // const pairs = stablePairs(needRoomByUsername, hasRoomByUsername, usersNeedRoom, usersHaveRoom);

        res.send({
            // needRoomByUsername,
            // hasRoomByUsername,
            // usersHaveRoom,
            // usersNeedRoom,
            scores
        });

    }


    start();
}


function stablePairs(needRoomObject, hasRoomObject, needRoomUsernames, hasRoomUsernames) {

    const needRoom = _.mapValues(hasRoomObject, function(user, index) {
        return _.assign(user, {
                status: 'Free',
                partner: null
            }
        );
    });

    const hasRoom = _.mapValues(hasRoomObject, function(user, index) {
        return _.assign(user, {
                status: 'Free',
                partner: null
            }
        );
    });




    let potentialPair;
    function getIndexOfSomeoneToPropose(userDataObject) {
        // For each user looking for a room
        for(var needRoomUsername in userDataObject) {
            // find a hasRoom that he has not yet proposed to
            const hasRoomIndex =  _.findIndex(userDataObject[needRoomUsername], x => x.partner === null);
            if(hasRoomIndex !== -1) {
                const score = userDataObject[needRoomUsername][hasRoomIndex].totalScore;
                potentialPair = [needRoomUsername, hasRoomIndex];
                return;
            }
        }

        potentialPair = null;
        return;
    }

    getIndexOfSomeoneToPropose(needRoom)
    while(isArray(potentialPair)) {
        // potentialPair is an array containing the information we need
        // Get the username of the needRoom
        // Get the username of the hasRoom
        // Get the score of potentialPair
        const usernameOfNeedRoom = potentialPair[0];
        const userNameOfHasRoom = needRoom[userNameOfNeedRoom][potentialPair[1]].username2;
        const score = potentialPair[2];




        getIndexOfSomeoneToPropose(needRoom)
    }

   /*
    * function stableMatching {
    *     Initialize all m ∈ M and w ∈ W to free
    *     while ∃ free man m who still has a woman w to propose to {
    *         w = first woman on m’s list to whom m has not yet proposed
    *             if w is free
    *                (m, w) become engaged
    *             else some pair (m', w) already exists
    *                 if w prefers m to m'
    *                     m' becomes free
    *                     (m, w) become engaged
    *                 else
    *                     (m', w) remain engaged
    *    }
    * }
    */
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

