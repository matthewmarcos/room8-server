import mysql from 'anytv-node-mysql';


export const clearDatabase = (req, res, next) => {
    const start = () => {
        mysql.use('master')
            .transaction()
            .query('DELETE FROM user_organization', errorPrinter)
            .query('DELETE FROM user_preferences_lifestyle', errorPrinter)
            .query('DELETE FROM user_preferences_location', errorPrinter)
            .query('DELETE FROM user_preferences_misc', errorPrinter)
            .query('DELETE FROM user_preferences_sex', errorPrinter)
            .query('DELETE FROM user_preferences_utilities', errorPrinter)
            .query('DELETE FROM user_preferences_when', errorPrinter)
            .query('DELETE FROM user_profile', errorPrinter)
            .query('DELETE FROM user_hobby', errorPrinter)
            .query('DELETE FROM user_interest', errorPrinter)
            .query('DELETE FROM user', errorPrinter)
            .commit(sendData);
    };


    const errorPrinter = (err, result, args, lastQuery) => {
        if(err) {
            next({ status: 500, message: 'Cound not delete the stuff' })
        }
    };


    const sendData = (err, result, args, lastQuery) => {
        if(err) {
            next({ status: 500, message: 'Cound not delete the stuff' })
        }

        res.send(`
            <h1>Deleted database!</h1>
        `);
    }


    start();
};

