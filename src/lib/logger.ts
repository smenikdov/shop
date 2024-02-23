import type { Logger } from 'winston';
import winston from 'winston';

const logger: Logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'application-log/combined.log',
        }),
        new winston.transports.File({
            filename: 'application-log/error.log',
            level: 'error',
        }),
    ],
});

export const log = (message: string): void => {
    logger.info({
        message,
    });
};

export const logError = (error: Error): void => {
    logger.error({
        message: error.message,
        stack: error.stack,
    });
};
