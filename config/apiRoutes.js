import express from 'express';

const router = express.Router();

/* GET index */
router.get('/', (req, res, next) => {
    res.send({something: '!Working root!'});
});

export default router;
