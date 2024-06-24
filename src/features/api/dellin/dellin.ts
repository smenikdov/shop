import axios from 'axios';

const dellinToken = process.env.DELLIN_TOKEN;

export const dellin = axios.create({
    baseURL: 'https://api.dellin.ru/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    params: {
        appkey: '', // TODO
    },
});
