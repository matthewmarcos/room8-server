import { getData } from '../helpers/utils'


const _getData = (query) => {
    return (req, res, next) => {
        const { id } = req.user;

        res.send({
            method: req.method,
            tableName,
            query,
            id
        });
    };

};


const _putData = (query) => {
    return (req, res, next) => {
        const { id } = req.user;

        res.send({
            method: req.method,
            tableName,
            query,
            id
        });
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
    if(!tableName) {
        return (req, res, next) => {
            next(500);
        };
    }
    else {
        const query = `
            UPDATE user_preferences_${ tableName }
                SET ?
            WHERE id=?;
        `;

        return _putData(query);
    }
};

