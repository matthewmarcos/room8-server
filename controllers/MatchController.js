import _ from 'lodash';
import async from 'async';
import mysql from 'anytv-node-mysql';
import { toCamelCase } from 'case-converter';
import makeArray from 'number-array-generator';

import * as errorTypes from '../helpers/errorTypes';
import { resourceNotFound } from '../helpers/errorTypes'


export default function(req, res, next) {
    const query = `
        SELECT
            me.id,
            username,
            status,
            me.cleanliness as my_cleanliness,
            a.cleanliness as preferred_cleanliness,
            me.sex as my_sex,
            b.sex as preferred_sex,
            smoker as my_smoker,
            has_org,
            gender,
            course,
            batch,
            birthday,
            contact_number,
            start_date,
            duration,
            rent_price_range_start,
            rent_price_range_end,
            should_include_utilities,
            utilities_price_range_start,
            utilities_price_range_end,
            nearby_restaurants,
            travel_time_to_uplb,
            general_location,
            airconditioning,
            laundry,
            cooking,
            gas_stove,
            electric_stove,
            microwave,
            water_kettle,
            internet,
            torrent,
            speed_requirement,
            alcohol,
            smokers as preferred_smokers,
            study_time,
            guests_in_room,
            guests_study_area,
            pets,
            org,
            curfew,
            curfew_time
        FROM user
        NATURAL JOIN user_preferences_sex b
        NATURAL JOIN user_preferences_utilities
        NATURAL JOIN user_preferences_when
        NATURAL JOIN user_preferences_misc
        NATURAL JOIN user_preferences_cost
        NATURAL JOIN user_preferences_location
        NATURAL JOIN user_preferences_lifestyle a
        INNER JOIN user_profile me
        ON me.id = a.id
        WHERE status = ?
    `;
    let needRoom = [];
    let hasRoom = [];
    let cartesianCollection = [];


    function start() {

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
            console.error(err);
            return callback(resourceNotFound);
        }

        callback(null, results);
    }


    function loopData(err, result) {
        if(err) {
            return next(err);
        }

        needRoom = toCamelCase(result[0]);
        hasRoom = toCamelCase(result[1]);
        console.log(needRoom.length)
        console.log(hasRoom.length)
        cartesianCollection = cartesian(needRoom, hasRoom); // Create pair
 
        /*
         * IN MEMORY:
         * Brute force create the list of possible pairs
         * For each pair:
         * 1. Determine the matching score
         * 2. push the data to some array
         * 3. save the data
         */

        const scores = cartesianCollection.map(function(pair, index) {
            return scoreUsers(pair[0], pair[1]);
        });




        res.send({
            cartesianCollection,
            scores,
            // needRoom: result[0],
            // hasRoom: result[1],
            status: 200,
            message: 'Done'
        });
    }

    start();
}


/*
 * Scores 2 users compatibility based on input
 */
function scoreUsers(user1, user2) {
    let cleanlinessScore = 0,
        sexScore = 0,
        smokerScore = 0,
        startDateScore = 0,
        rentScore = 0,
        nearbyRestaurantsScore = 0,
        travelTimeToUplbScore = 0,
        locationScore = 0,
        utilitiesScore = 0,
        speedScore = 0,
        studyTimeScore = 0,
        guestsInRoomScore = 0,
        guestsStudyAreaScore = 0,
        orgScore = 0,
        curfewTimeScore = 0,
        overallScore = 0;

    function computeCleanliness(user1, user2) {
        let tempScore = 0;
        const user1Magnetism = (user1.preferredCleanliness <= user2.myCleanliness) ? 10 :
                                (10 - (user1.preferredCleanliness - user2.myCleanliness));
        const user2Magnetism = (user2.preferredCleanliness <= user1.myCleanliness) ? 10 :
                                (10 - (user2.preferredCleanliness - user1.myCleanliness));

        tempScore = (user1Magnetism + user2Magnetism) / 2;

        return tempScore;
    }

    cleanlinessScore = computeCleanliness(user1, user2);

    function computeSex(user1, user2) {
        let tempScore = 0;

        if(user1['preferredSex'] === 'Do not care' && user2['preferredSex'] === 'Do not care') {
            return 10;
        }
        else {
            if(user1['preferredSex'] === user2['mySex'] || user1['preferredSex'] === 'Do not care') tempScore += 5;
            if(user2['preferredSex'] === user1['mySex'] || user2['preferredSex'] === 'Do not care') tempScore += 5;

            return tempScore;
        }
    }

    sexScore = computeSex(user1, user2);

    function exactYesNo(user1, user2, profField, prefField) {
        let tempScore = 0;

        if(user1[prefField] === user2[profField]) tempScore += 5;
        if(user2[prefField] === user1[profField]) tempScore += 5;

        return tempScore;
    }

    smokerScore = exactYesNo(user1, user2, 'mySmoker', 'preferredSmokers');

    function computeStartDate(user1, user2) {
        return (user1.startDate >= user2.startDate) ? 10 : 0;
    }

    startDateScore = computeStartDate(user1, user2);

    overallScore = cleanlinessScore + sexScore + smokerScore + startDateScore +
            rentScore + nearbyRestaurantsScore + travelTimeToUplbScore + locationScore +
            utilitiesScore + speedScore + studyTimeScore + guestsInRoomScore +
            guestsStudyAreaScore + orgScore + curfewTimeScore;

    return {
        scores: {
            cleanlinessScore,
            sexScore,
            smokerScore,
            startDateScore,
            rentScore,
            nearbyRestaurantsScore,
            travelTimeToUplbScore,
            locationScore,
            utilitiesScore,
            speedScore,
            studyTimeScore,
            guestsInRoomScore,
            guestsStudyAreaScore,
            orgScore,
            curfewTimeScore
        },
        overallScore
    };
};


/*
 * Get the cartesian product of the arrays entered as args
 */
function cartesian(...args) {
    return _.reduce(args, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), false);
    }, [[]]);

};


/*
 * Check if a user has enough variables / is okay to start being paired
 */
function checkPermissions(user) {

    return true;
}