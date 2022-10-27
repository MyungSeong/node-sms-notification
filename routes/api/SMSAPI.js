import crypto from 'crypto';

import { ApiManager } from '../utils/lib/APIManager';
import {
    API_URL,
    NAVER_API_URL,
    NAVER_API_SMS_SERVICE_ID,
    NAVER_API_SMS_ACCESS_KEY,
    NAVER_API_SMS_SECRET_KEY,
    CALLER_ID,
} from '../utils/constants/Config';

const $http = new ApiManager();

const smsURI = `${NAVER_API_URL}/sms/v2/services/${NAVER_API_SMS_SERVICE_ID}/messages`;

const companyName = 'OO솔루션';
const smsSubject = `${COMPANY_NAME} 알림 문자`;
const smsContent = `메시지 내용입니다.\n${companyName}`;

export const sendSMS = ({ id, files = [] }) => {
    try {
        const receiverInfo = $http.post(API_URL, id);

        const { phoneNumber } = receiverInfo;
        // phoneNumber.split('-').join('');

        const smsInfo = {
            type: 'SMS', // SMS 80byte, LMS 2000byte,
            from: CALLER_ID,
            subject: smsSubject,
            content: smsContent,
            messages: [{ to: phoneNumber }],
            files,
            /* files: [
                {
                    name: '',
                    body: '',
                },
            ], */
        };

        const signature = crypto
            .createHmac('sha256', NAVER_API_SMS_SECRET_KEY)
            .update(
                `POST ${smsURI.replace(NAVER_API_URL, '')}\n
                ${Date.now()}\n
                ${NAVER_API_SMS_ACCESS_KEY}`,
            )
            .digest('base64');

        $http.setHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': Date.now(),
            'x-ncp-iam-access-key': NAVER_API_SMS_ACCESS_KEY,
            'x-ncp-apigw-signature-v2': signature,
        });

        return $http.post(smsURI, smsInfo);
    } catch (error) {
        throw error;
    }
};
