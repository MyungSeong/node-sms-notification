import express from 'express';

import logger from '../../config/Logger';

import SMSService from './sms.service';

const router = express.Router();

router.post('/get-smsinfo', async (req, res, next) => {
    try {
        const resultData = await SMSService.getSMSInfo(req.body);

        return res.status(200).json({
            status: 200,
            result: resultData,
            message: 'Get SMS Info Success',
        });
    } catch (error) {
        logger.error(`[SMS][GET] ${error.message}`);

        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

export default router;
