import { toCamelCase } from 'case-converter'


const ResponseExtender = () => {
    return (req, res, next) => {
        const oldSend = res.send;
        const oldStatus = res.status;

        res.send = (response) => {
            // Only send if res has not sent to client yet.
            res.send = oldSend;
            if(!res.headersSent) {
                return res.send(toCamelCase(response));
            }

            return;
        }

        res.status = (statusCode) => {
            // Only send if res has not sent to client yet.
            res.status = oldStatus;
            if(!res.headersSent) {
                return res.status(statusCode);
            }

            return res;
        }

        next();
    };

};

export default ResponseExtender;
