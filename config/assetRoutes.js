/*
 * Asset Routes
 * Prefixed with assets
 * Format:
 *  /assets/:filename
 */

import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('*', (req, res, next) => {

    // https://expressjs.com/en/api.html#res.sendFile
    const filePath = path.normalize(path.join(__dirname, '../public', req.originalUrl));
    const options = {
        dotfiles: 'deny'
    };

    res.sendFile(filePath, options, (err) => {

        next(err.status);
    });

});

export default router;
