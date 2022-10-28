import cryptoJS from 'crypto-js';

import { APIManager } from '../utils/lib';
import {
    API_URL,
    NAVER_API_URL,
    NAVER_API_SMS_SERVICE_ID,
    NAVER_API_SMS_ACCESS_KEY,
    NAVER_API_SMS_SECRET_KEY,
    CALLER_ID,
} from '../utils/constants/Config';

const $http = new APIManager();

const smsURI = `${NAVER_API_URL}/sms/v2/services/${NAVER_API_SMS_SERVICE_ID}/messages`;

const companyName = 'OO솔루션';
const smsSubject = `${companyName} 알림 문자`;
const smsContent = `메시지 내용입니다.\n${companyName}`;

export const sendSMS = ({ id, files = [] }) => {
    try {
        // const receiverInfo = $http.post(API_URL, id);
        const receiverInfo = { phoneNumber: CALLER_ID };

        const { phoneNumber } = receiverInfo;
        // phoneNumber.split('-').join('');

        const smsInfo = {
            type: 'SMS', // SMS 80byte, LMS 2000byte,
            from: CALLER_ID,
            messages: [
                {
                    to: phoneNumber,
                    subject: smsSubject,
                    content: smsContent,
                },
            ],
            files,
            /* files: [
                {
                    name: '',
                    body: 'data:image/jpg;base64,',
                },
            ], */
        };

        const signature = cryptoJS
            .HmacSHA256(
                `POST ${smsURI.replace(
                    NAVER_API_URL,
                    '',
                )}\n${Date.now()}\n${NAVER_API_SMS_ACCESS_KEY}`,
                NAVER_API_SMS_SECRET_KEY,
            )
            .toString(cryptoJS.enc.Base64);

        $http.setHeaders({
            'x-ncp-apigw-timestamp': Date.now(),
            'x-ncp-iam-access-key': NAVER_API_SMS_ACCESS_KEY,
            'x-ncp-apigw-signature-v2': signature,
        });

        return $http.post(smsURI, smsInfo);
    } catch (error) {
        throw error;
    }
};
