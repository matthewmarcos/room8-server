import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('*', (req, res, next) => {

    console.log('Original Url: ', req.originalUrl);

    const filePath = path.normalize(path.join(__dirname, '../public', req.originalUrl));

    console.log('filepath: ', filePath);

    fs.open(filePath, 'r', (err, fd) => {

        if (err) {
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

export default router;
