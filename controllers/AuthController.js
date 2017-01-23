// AuthControllers:
    // - login
    // - register
    // - profile

import _ from 'lodash';

export const login = (req, res, next) => {
    res.status(200).send({
        something: 'hello'
    });
};
