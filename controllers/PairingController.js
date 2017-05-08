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


        const pairs = stablePairs(needRoomByUsername, hasRoomByUsername);

        res.send({
            pairs
        });

    }


    start();
}


function stablePairs(needRoomObject, hasRoomObject) {
    const merged = _.assign({}, needRoomObject, hasRoomObject);

    const scores = _.mapValues(needRoomObject, (user) => {
        return _.chain(user)
                .groupBy(potentialPartner => potentialPartner.username2)
                .mapValues(x => x[0].totalScore)
                .value();
    });

    const needRoom = _.mapValues(needRoomObject, function(user, index) {
        return _.assign(user, {
                    status: 'Free',
                    partner: null
                });
    });

    const hasRoom = _.mapValues(hasRoomObject, function(user, index) {
        return _.assign(user, {
                status: 'Free',
                partner: null
            });
    });

    const proposingNames = Object.keys(needRoomObject); // names of the group that will propose

    const needs = proposingNames.concat(Object.keys(hasRoomObject));

    let proposals = _(needs)
                        .zip(_.times(needs.length, x => { return {} }))
                        .groupBy(x => x[0])
                        .mapValues((value, key, object) => {
                            return {
                                username: key,
                                partner: null,
                                list: merged[key].map(x => x.username2)
                            }
                        })
                        .value();

    function getSingleMale(proposals, proposingNames) {
        // return the username of the needRoom person who has no pair yet

        let singleMale = null;

        _(proposingNames).forEach(function(name) {
            if(proposals[name].partner === null) {
                singleMale = name;
            }
        });

        return singleMale;
    }

    let currentMale = getSingleMale(proposals, proposingNames); // username of current unpaired male
    while(currentMale !== null) {
        const nextChoice = proposals[currentMale].list[0];
        proposals[currentMale].list = _.tail(proposals[currentMale].list); // Remove nextChjoice from the list

        if(proposals[nextChoice].partner === null) {
            proposals[nextChoice].partner = currentMale;
            proposals[currentMale].partner = nextChoice;
        }
        else {
            const malePrime = proposals[nextChoice].partner;
            const scorePrime = scores[malePrime][nextChoice];
            const currentMaleScore = scores[currentMale][nextChoice];

            if(currentMaleScore > scorePrime) {
                proposals[malePrime].partner = null;
                proposals[nextChoice].partner = currentMale;
                proposals[currentMale].partner = nextChoice;
            }
        }

        currentMale = getSingleMale(proposals, proposingNames);
    }

    return {
        scores, //needRoom, hasRoom
        proposals,
    };


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

