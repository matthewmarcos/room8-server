// Put all the configuration stuff here
import _ from 'lodash';


export default {
    APP_NAME: 'Room8!: The best roommate matchmaking application for UPLB',
    PORT: 3001,

    // Sample redis config for sessions
    REDIS: {
        url: 'localhost',
        host: '',
        client: ''
    },

    // Sample db config
    MYSQL: {
        host: 'localhost',
        port: 3306,

        user: 'root',
        password: 'user',
        database: 'room8_dev',

        timezone: 'local',
        acquireTimeout: 10000,
        connectionLimit: 20
    }
};
