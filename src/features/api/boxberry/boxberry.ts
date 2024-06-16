import axios from 'axios';

const boxberryToken = process.env.BOXVERRY_TOKEN;

export const boxberry = axios.create({
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
