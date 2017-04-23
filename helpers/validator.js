import { missingFields } from './errorTypes';
/*
    validate() : Middleware used to check if req object contains certain propertoes.

    Usage:
    const validate = require('validator.js');
    router.method(
        validate([
            'fieldName1',
            'fieldName2',
            'fieldName3',
            'fieldName4',
        ], 'property'),
        callback
    )
*/

export const validate = function(fields, method) {
    return (req, res, next) => {
        fields.forEach(field => {
            if (method.toLowerCase() == 'query') {
                req.checkQuery(field, `Field "${field}" in query is required.`).notEmpty();
            }
            else if (method.toLowerCase() == 'params') {
                req.checkParams(field, `Field "${field}" in params is required.`).notEmpty();
            }
            else if (method.toLowerCase() == 'body') {
                req.checkBody(field, `Field "${field}" in body is required.`);
            }
        });

        req.getValidationResult().then((result) => {
            if (!result.isEmpty()) {
                // error
                next(missingFields(result.array()));
            }
            else {
                next();
            }
        });
    };
};
