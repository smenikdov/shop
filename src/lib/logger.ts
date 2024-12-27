import winston from 'winston';

class Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
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
    }

    debug(message: any, meta?: any) {
        this.logger.debug({ message, meta });
    }

    info(message: any, meta?: any) {
        this.logger.info({ message, meta });
    }

    warn(message: any, meta?: any) {
        this.logger.warn({ message, meta });
    }

    error(message: any, meta?: any) {
        this.logger.error({ message, meta });
    }
}

class RequestLogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.File({
                    filename: 'application-log/request.log',
                }),
            ],
        });
    }

    info(message: any, meta?: any) {
        this.logger.info({
            message,
            meta,
        });
    }
}

export const logger = new Logger();
export const requestLogger = new RequestLogger();
