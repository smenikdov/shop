import axios from 'axios';

const smsId = process.env.SMS_ID;

export const sms = axios.create({
    baseURL: 'https://sms.ru/sms/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    params: {
        api_id: process.env.SMS_ID,
        json: 1,
    },
});
