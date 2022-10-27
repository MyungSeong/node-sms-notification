import express from 'express';

import * as SMSAPI from './api/SMSAPI';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
    });
});

router.get('/:id', function (req, res, next) {
    SMSAPI.sendSMS(req.params).then((data) => {
        console.log(data);
    });

    res.render('index', {
        title: 'test',
    });
});

export default router;
