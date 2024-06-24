import axios from 'axios';

const fivepostToken = process.env.FIVEPOST_TOKEN;

export const fivepost = axios.create({
    baseURL: ' https://api.boxberry.ru/json.php/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
