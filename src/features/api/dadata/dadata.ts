import axios from 'axios';

const dadataToken = process.env.DADATA_TOKEN;
const dadataSecret = process.env.DADATA_SECRET;

export const dadata = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${dadataToken}`,
        'X-Secret': dadataSecret,
    },
});

export const dadataCleaner = axios.create({
    baseURL: 'https://cleaner.dadata.ru/api/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${dadataToken}`,
        'X-Secret': dadataSecret,
    },
});
