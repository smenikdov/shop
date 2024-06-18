import axios from 'axios';

const yookassaToken = process.env.YOOKASSA_TOKEN;

export const yookassa = axios.create({
    baseURL: ' https://api.boxberry.ru/json.php/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    params: {
        token: boxberryToken,
        CountryCode: 643,
    },
});
