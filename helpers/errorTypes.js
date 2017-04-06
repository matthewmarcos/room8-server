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
