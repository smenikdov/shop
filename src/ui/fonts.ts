import { IBM_Plex_Serif, IBM_Plex_Sans } from 'next/font/google';

// https://fonts.google.com/specimen/IBM+Plex+Serif
export const plexSerif = IBM_Plex_Serif({
    weight: ['200', '300', '400', '500', '600', '700'],
    display: 'swap',
    subsets: ['cyrillic'],
});

// https://fonts.google.com/specimen/IBM+Plex+Sans
export const plexSans = IBM_Plex_Sans({
    weight: ['200', '300', '400', '500', '600', '700'],
    display: 'swap',
    subsets: ['cyrillic'],
});
