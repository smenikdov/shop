export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    ACCESS_DENIED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

export interface Response {
    message?: string;
    statusCode: HttpStatusCode;
    isSuccess: boolean;
}

/* ============= Response ============= */

interface ResponsePayload {
    message?: string;
    statusCode: HttpStatusCode;
    isSuccess: boolean;
}

class BaseResponse implements Response {
    public readonly message?: string;
    public readonly statusCode: HttpStatusCode;
    public readonly isSuccess: boolean;

    constructor({ message, statusCode, isSuccess }: ResponsePayload) {
        this.message = message;
        this.statusCode = statusCode;
        this.isSuccess = isSuccess;
    }
}

/* ============= ErrorResponse ============= */

interface ErrorResponsePayload {
    message: string;
    statusCode: HttpStatusCode;
    errorCode?: number;
    error?: any;
}

export class ErrorResponse extends BaseResponse {
    public readonly errorCode?: number;
    public readonly error?: any;

    constructor({
        message = 'Проищла ошибка',
        statusCode,
        errorCode,
        error,
    }: ErrorResponsePayload) {
        super({
            message,
            statusCode,
            isSuccess: false,
        });

        this.errorCode = errorCode;
        this.error = error;
    }
}

/* ============= SuccessResponse ============= */

interface SuccessResponsePaylaod {
    message?: string;
    data?: any;
}

export class SuccessResponse extends BaseResponse {
    public readonly data?: any;

    constructor({ message, data }: SuccessResponsePaylaod = {}) {
        super({
            message,
            statusCode: HttpStatusCode.OK,
            isSuccess: true,
        });

        this.data = data;
    }
}

/* ============= ServerErrorResponse ============= */

interface ServerErrorResponsePayload {
    message: string;
}

export class ServerErrorResponse extends ErrorResponse {
    constructor({ message = 'Произошла ошибка' }: ServerErrorResponsePayload) {
        super({
            message,
            statusCode: HttpStatusCode.INTERNAL_SERVER,
        });
    }
}

/* ============= RequestErrorResponse ============= */

interface RequestErrorResponsePayload {
    message: string;
    error?: any;
}

export class RequestErrorResponse extends ErrorResponse {
    constructor({ message = 'Произошла ошибка', error }: RequestErrorResponsePayload) {
        super({
            message,
            statusCode: HttpStatusCode.BAD_REQUEST,
            error,
        });
    }
}
