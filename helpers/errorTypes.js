export const forbidden = {
    status: 403,
    message: 'Forbidden'
};

export const missingFields = (result) => {
    return {
        status: 422,
        message: 'Missing fields',
        fields: result
    };
};

export const duplicateError = {
    status: 409,
    message: 'Conflict error when inserting to database'
};

export const validationError = {
    status: 422,
    message: 'Validation error, input may not be valid'
};

export const invalidCredentials = (info) => {
    return {
        status: 401,
        message: info
    }
};

export const resourceNotFound = {
    status: 404,
    message: 'Resource not found'
};

export const tableInsertionError = (tableName) => {
    return {
        status: 500,
        message: `unable to insert ${ type }`
    }
};
