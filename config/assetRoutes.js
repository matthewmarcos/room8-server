const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('*', function(req, res, next) {
    const filePath = req.originalUrl;

    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            if (err.code === "ENOENT") {
                return res.sendStatus(404);
            }
            else {
                throw err;
            }
        }
        else {
            res.send({something: filePath});
        }

    });
});

module.exports = router;
