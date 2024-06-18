import axios from 'axios';

const cdekToken = process.env.CDEK_TOKEN;

export const cdek = axios.create({
    baseURL: ' https://api.boxberry.ru/json.php/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
