import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.API_URL;
export const NAVER_API_URL = 'https://sens.apigw.ntruss.com';
export const NAVER_API_SMS_SERVICE_ID = process.env.NAVER_API_SMS_SERVICE_ID;
export const NAVER_API_SMS_ACCESS_KEY = process.env.NAVER_API_SMS_ACCESS_KEY;
export const NAVER_API_SMS_SECRET_KEY = process.env.NAVER_API_SMS_SECRET_KEY;
export const CALLER_ID = process.env.CALLING_LINE;
