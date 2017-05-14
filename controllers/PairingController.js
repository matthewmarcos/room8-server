import _ from 'lodash';
import async from 'async';
import mysql from 'anytv-node-mysql';
import { toCamelCase, toSnakeCase } from 'case-converter';
import makeArray from 'number-array-generator';
import * as fuzz from 'fuzzball';
import { isArray } from 'typechecker';

import * as errorTypes from '../helpers/errorTypes';
import { resourceNotFound } from '../helpers/errorTypes'


export function getPair(req, res, next) {
    // Get the entire user profile of your pair

    const { user } = req;
    const { id } = user;
    const queryString = `
        SELECT
            them.id, username, status, them.cleanliness as cleanliness, a.cleanliness as preferred_cleanliness,
            them.sex as sex, b.sex as preferred_sex, smoker as smoker, smokers as preferred_smokers, org, gender,
            course, batch, birthday, contact_number, start_date, duration, rent_price_range_start, rent_price_range_end,
            should_include_utilities, utilities_price_range_start, utilities_price_range_end, nearby_restaurants,
            travel_time_to_uplb, general_location, airconditioning, laundry, cooking, gas_stove, electric_stove, microwave,
            water_kettle, internet, torrent, speed_requirement, alcohol, study_time, guests_in_room,
            guests_study_area, pets, curfew, curfew_time
        FROM user NATURAL JOIN user_preferences_sex b NATURAL JOIN user_preferences_utilities NATURAL JOIN user_preferences_when
        NATURAL JOIN user_preferences_misc NATURAL JOIN user_preferences_cost NATURAL JOIN user_preferences_location
        NATURAL JOIN user_preferences_lifestyle a INNER JOIN user_profile them ON them.id = a.id INNER JOIN user_pairs pairs
        ON pairs.id2 = them.id WHERE pairs.id1 = ?
    `.replace(/\n/g, '').replace(/[  ]+/g, ' ');

    function start() {

        mysql.use('master')
            .query(queryString, [ id ], sendData)
            .end();
    }


    function sendData(err, response, args, lastQuery) {
        if(err) {
            console.errors(err);
            return next(errorTypes.genericError('getPairs error at selecting data', { err, response, lastQuery }));
        }

        if(response.length === 0) {
            // No pair found
            return res.send({
                pair: false
            });
        }

        const newResponse = _.mapKeys(response[0], (value, key, object) => {
            return 'pair_' + key;
        })

        res.send({
            pair: newResponse
        });
    }

    start();
}


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
        const needRoomUsernames = Object.keys(needRoomByUsername);
        const hasRoomUsernames = Object.keys(hasRoomByUsername);


        // Generate pairs with gale-shapley
        const pairs = stablePairs(needRoomByUsername, hasRoomByUsername);

        const { needs } = pairs;
        const merged = _.assign({}, needRoomByUsername, hasRoomByUsername);

        const mergedUsers = _.assign({}, needRoomByUsername, hasRoomByUsername);
        const idMaps = _.mapValues(mergedUsers, x => x[0].id1);

        // get finalized pairings from gale-shapley
        const { proposals } = pairs;
        const finalPairsWithNull = Object.keys(mergedUsers).map((user, index) => {
            const user1 = user;
            const user2 = proposals[user].partner;

            if(!user1 || !user2) {
                return null;
            }

            return [ user1, user2 ];
        });
        const finalPairsIdWithNull = Object.keys(mergedUsers).map((user, index) => {

            const user1 = idMaps[user];
            const user2 = idMaps[proposals[user].partner];

            if(!user1 || !user2) {
                return null;
            }

            return [ user1, user2 ];
        });
        const finalPairs = finalPairsWithNull.filter(x => x !== null);
        const finalPairsId = finalPairsIdWithNull.filter(x => x !== null);

        // console.log('value: ', value);
        // console.log('proposals: ', proposals);
        // console.log('finalPairsWithNull: ', finalPairsWithNull);
        // console.log('finalPairsIdWithNull: ', finalPairsIdWithNull);
        // console.log('finalPairs: ', finalPairs);
        // console.log('finalPairsId: ', finalPairsId);

        if(finalPairsId.length === 0) {
            return res.send({
                message: 'No pairs made'
            });
        }

        mysql.use('master')
            .args(idMaps, finalPairs, finalPairsId)
            .transaction()
            .query('DELETE from user_pairs', checkErrors('Error deleting user_pairs'))
            .query(`INSERT INTO user_pairs (id1, id2) VALUES ?`, [ finalPairsId ], checkErrors('Error inserting data'))
            .commit(sendData);
    }


    const checkErrors = (type = 'user') => {
        return function(err, res, args, lastQuery) {
            if(err) {
                console.error(err);
                return next(errorTypes.tableInsertionError(type));
            }
        };
    }


    function sendData(err, response, args, lastQuery) {
        const idMaps = args[0];
        const finalPairs = args[1];
        const finalPairsId = args[2];

        if(err) {
            console.error(err);
            return next(errorTypes.genericError('Error inserting to user_pairs', {
                err, response, finalPairs, finalPairsId, lastQuery
            }));
        }

        res.send({
            response,
            idMaps,
            finalPairs,
            finalPairsId
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
                                partner: '',
                                list: merged[key].map(x => x.username2)
                            }
                        })
                        .value();

    function getSingleMale(proposals, proposingNames) {
        // return the username of the needRoom person who has no pair yet

        let singleMale = null;

        _(proposingNames).forEach(function(name) {
            if(proposals[name].partner === '' && proposals[name].list.length > 0) {
                singleMale = name;
            }
        });

        return singleMale;
    }

    let currentMale = getSingleMale(proposals, proposingNames); // username of current unpaired male
    while(currentMale !== null) {
        const nextChoice = proposals[currentMale].list[0];
        proposals[currentMale].list = _.tail(proposals[currentMale].list); // Remove nextChjoice from the list

        if(proposals[nextChoice].partner === '') {
            proposals[nextChoice].partner = currentMale;
            proposals[currentMale].partner = nextChoice;
        }
        else {
            const malePrime = proposals[nextChoice].partner;
            const scorePrime = scores[malePrime][nextChoice];
            const currentMaleScore = scores[currentMale][nextChoice];

            if(currentMaleScore > scorePrime) {
                proposals[malePrime].partner = '';
                proposals[nextChoice].partner = currentMale;
                proposals[currentMale].partner = nextChoice;
            }
        }

        currentMale = getSingleMale(proposals, proposingNames);
    }

    return {
        scores, //needRoom, hasRoom
        proposals,
        needs
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

