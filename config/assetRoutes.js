const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('*', function(req, res, next) {
    console.log('Original Url: ', req.originalUrl);
    console.log('__dirname: ', __dirname);
    const filePath = path.normalize(path.join(__dirname, '../public', req.originalUrl));
    // const filePath = `${ __dirname }/../public/assets/profile.jpg`;
    console.log('filepath: ', filePath);

    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            console.log(err);
            if (err.code === "ENOENT") {
                return res.sendStatus(404);
            }
            else {
                // throw err;
                return res.sendStatus(404);
            }
        }
        else {
            res.send({fd});
        }

    });
});

module.exports = router;
