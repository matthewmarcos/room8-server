import mysql from 'anytv-node-mysql';
import * as errorTypes from '../helpers/errorTypes';
import { toSnakeCase } from 'case-converter';
import _ from 'lodash';


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
                user
            });
    }

    start();
}


export function prefLifestyle (req, res, next) {
    const { user, body } = req;

    const start = () => {
        let insertData = toSnakeCase(body);

        /*
            Cannot send a type Number with insomnia. This is the workaround.
            Please keep it as a Number in the database for easier computation
        */
        insertData.cleanliness = Number(insertData.cleanliness);

        mysql.use('master')
            .query(
                `UPDATE user_preferences_lifestyle SET ? WHERE id = ?`,
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
                message: 'Successfully updated lifestyle preferences',
                user
            });
    }

    start();
}


export function prefSex (req, res, next) {
    const { user, body } = req;

    const start = () => {
        let insertData = toSnakeCase(body);

        mysql.use('master')
            .query(
                `UPDATE user_preferences_sex SET ? WHERE id = ?`,
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
                message: 'Successfully updated preferences sex',
                user
            });
    }

    start();
}


export function prefLocation (req, res, next) {
    const { user, body } = req;

    const start = () => {
        let insertData = toSnakeCase(body);

        /*
            Cannot send a type Number with insomnia. This is the workaround.
            Please keep it as a Number in the database for easier computation
        */
        insertData.travel_time_to_uplb = Number(insertData.travel_time_to_uplb);

        mysql.use('master')
            .query(
                `UPDATE user_preferences_location SET ? WHERE id = ?`,
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
                message: 'Successfully updated utility location',
                user
            });
    }

    start();
}


export function prefMisc (req, res, next) {
    const { user, body } = req;

    const start = () => {
        /*
            @TODO: Find the best way to represent a time object in javascript without the date.
            Currently accepts Javascript Date object / Anything that can be used to instantiate
            javascript date object
        */
        const insertData = toSnakeCase(req.body);

        mysql.use('master')
            .query(
                `UPDATE user_preferences_misc SET ? WHERE id=?`,
                [ insertData, user.id ],
                sendData
            )
            .end();
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError)
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully misc preferences',
                path: req.path,
                user
            });
    }

    start();
}


export function prefCost (req, res, next) {
    const { user, body } = req;

    const start = () => {
        let insertData = body;

        /*
            Cannot send a type Number with insomnia. This is the workaround.
            Please keep it as a Number in the database for easier computation
        */
        insertData.rentPriceRangeStart = Number(insertData.rentPriceRangeStart);
        insertData.rentPriceRangeEnd = Number(insertData.rentPriceRangeEnd);
        insertData.utilitiesPriceRangeStart = Number(insertData.utilitiesPriceRangeStart);
        insertData.utilitiesPriceRangeEnd = Number(insertData.utilitiesPriceRangeEnd);

        insertData = toSnakeCase(insertData);
        mysql.use('master')
            .query(
                `UPDATE user_preferences_cost SET ? WHERE id = ?`,
                [ insertData, user.id ],
                sendData
            )
            .end();
    };

    const isValidInput = ({
        rentPriceRangeStart, rentPriceRangeEnd, utilitiesPriceRangeStart, utilitiesPriceRangeEnd
    }) => {
        if(rentPriceRangeEnd < rentPriceRangeStart || utilitiesPriceRangeEnd < utilitiesPriceRangeStart) {
            return false;
        }

        return true;
    };

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully updated utility cost',
                user
            });
    };

    start();
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
                    .query(query, [id], sendResponse)
                    .end();
            };

            const sendResponse = (err, result, args, lastQuery) => {
                delete result[0].password;

                res.send({
                    preferences: result[0],
                    user: req.user,
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
            NATURAL JOIN user_preferences_cost
            WHERE id = ?;
        `;
    return _getData(query);
};


export const getHobbies = (req, res, next) => {
    const { id } = req.user;
    const { hobbies } = req.body

    const start = () => {
        mysql.use('master')
            .query(
                'SELECT * FROM user_hobby WHERE id = ?',
                [ id ],
                sendData
            )
            .end();
    };

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        const myResult = result.map(x => x.hobby);

        res.status(200)
            .send({
                status: 200,
                user: req.user,
                hobbies: myResult
            });
    };

    start();
};


export const setHobbies = (req, res, next) => {
    const { id } = req.user;
    const { hobbies } = req.body

    const start = () => {
        const insertData = hobbies.map((hobby) => {
            return [ id, hobby ];
        });

        if(insertData.length > 0) {
            mysql.use('master')
                .transaction()
                .query('DELETE FROM user_hobby WHERE id = ?', [ id ], checkErrors('Deleting existing hobbies'))
                .query(
                    'INSERT INTO user_hobby (id, hobby) VALUES ?',
                    [ insertData ],
                    checkErrors('Updating New Hobbies')
                )
                .commit(sendData);
        }
        else {
            mysql.use('master')
                .query('DELETE FROM user_hobby WHERE id = ?', [ id ], sendData)
                .end();
        }
    };

    const checkErrors = (type = 'delete') => {
        return function(err, res, args, lastQuery) {
            if(err) {
                return next(errorTypes.tableInsertionError(type));
            }
        };
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully set hobbies',
                user: req.user,
                hobbies
            });
    };

    start();
};

export const getOrganizations = (req, res, next) => {
    const { id } = req.user;
    const { hobbies } = req.body

    const start = () => {
        mysql.use('master')
            .query(
                'SELECT * FROM user_organization WHERE id = ?',
                [ id ],
                sendData
            )
            .end();
    };

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        const myResult = result.map(x => x.organization);

        res.status(200)
            .send({
                status: 200,
                user: req.user,
                organizations: myResult
            });
    };

    start();
};


export const setOrganizations = (req, res, next) => {
    const { id } = req.user;
    const { organizations } = req.body
    const insertData = organizations.map((organization) => {
        return [ id, organization ];
    });

    const start = () => {
        if(!!insertData.length) {
            mysql.use('master')
                .transaction()
                .query('DELETE FROM user_organization WHERE id = ?', [ id  ], checkErrors('Deleting existing organizations'))
                .query(
                    'INSERT INTO user_organization (id, organization) VALUES ?',
                    [ insertData  ],
                    checkErrors('Updating new organizations')
                )
                .commit(sendData);
        }
        else {
            mysql.use('master')
                .query('DELETE FROM user_organization WHERE id = ?', [ id ], sendData)
                .end();
        }
    };

    const checkErrors = (type = 'delete') => {
        return function(err, res, args, lastQuery) {
            if(err) {
                return next(errorTypes.tableInsertionError(type));
            }
        };
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully set organizations',
                user: req.user,
                organizations,
                insertData
            });
    };

    start();
    // res.send(req.body)
};

export const getInterests = (req, res, next) => {
    const { id } = req.user;
    const { interests } = req.body

    const start = () => {
        mysql.use('master')
            .query(
                'SELECT * FROM user_interest WHERE id = ?',
                [ id ],
                sendData
            )
            .end();
    };

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        const myResult = result.map(x => x.interest);

        res.status(200)
            .send({
                status: 200,
                user: req.user,
                interests: myResult
            });
    };

    start();
};


export const setInterests = (req, res, next) => {
    const { id } = req.user;
    const { interests } = req.body

    const start = () => {
        const insertData = interests.map((interest) => {
            return [ id, interest ];
        });

        if(insertData.length > 0) {
            mysql.use('master')
                .transaction()
                .query('DELETE FROM user_interest WHERE id = ?', [ id ], checkErrors('Deleting existing interest'))
                .query(
                    'INSERT INTO user_interest (id, interest) VALUES ?',
                    [ insertData ],
                    checkErrors('Updating New Interests')
                )
                .commit(sendData);
        }
        else {
            mysql.use('master')
                .query('DELETE FROM user_interest WHERE id = ?', [ id ], sendData)
                .end();
        }
    };

    const checkErrors = (type = 'delete') => {
        return function(err, res, args, lastQuery) {
            if(err) {
                return next(errorTypes.tableInsertionError(type));
            }
        };
    }

    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            return next(errorTypes.validationError);
        }

        res.status(200)
            .send({
                status: 200,
                message: 'Successfully set interests',
                user: req.user,
                interests
            });
    };

    start();
};

