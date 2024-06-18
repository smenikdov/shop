import axios from 'axios';

const dellinToken = process.env.DELLIN_TOKEN;

export const dellin = axios.create({
    baseURL: ' https://api.boxberry.ru/json.php/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
