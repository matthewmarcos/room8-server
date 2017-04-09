import { toCamelCase } from 'case-converter'


const ResponseExtender = () => {
    return (req, res, next) => {
        const oldSend = res.send;

        res.send = function(response) {
            // Convert everything res.send will send into camelcase
            res.send = oldSend;
            return res.send(toCamelCase(response));
        }

        next();
    };

};

export default ResponseExtender;
