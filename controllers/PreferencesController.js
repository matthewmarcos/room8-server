import mysql from 'anytv-node-mysql';
import { getData } from '../helpers/utils'
import errorTypes from '../helpers/errorTypes';

const formFields = {

    when: {
        startDate: '',
        duration: ''
    },

    utilities: {
        airconditioning: '',
        laundry: '',
        cooking: '',
        gasStove: '',
        electricStove: '',
        microwave: '',
        waterKettle: '',
        internet: '',
        torrent: '',
        speedRequirement: ''
    },

    lifestyle: {
        alcohol: '',
        cleanliness: '',
        smokers: '',
        studyTime: '',
        guestsInRoom: '',
        guestsStudyArea: '',
        pets: '',
        org: '',
    },

    location: {
    },

    misc: {
    },

    cost: {
    }
};


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

export const get = (tableName) => {
/*
 * tableName comes from the application and not the user so there is no need to check for malicious stuff
 */
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

export const put = (tableName) => {
    return function(req, res, next) {
        res.send(errorTypes.genericSuccessMessage('Successfully putting something'))
    }
};

