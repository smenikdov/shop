export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    ACCESS_DENIED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

type ErrorHttpStatusCodes =
    | HttpStatusCode.BAD_REQUEST
    | HttpStatusCode.UNAUTHENTICATED
    | HttpStatusCode.ACCESS_DENIED
    | HttpStatusCode.NOT_FOUND
    | HttpStatusCode.INTERNAL_SERVER;

type SuccessHttpStatusCodes = HttpStatusCode.OK;

interface IErrorResponse {
    error?: any;
    message?: string;
    statusCode: ErrorHttpStatusCodes;
    errorCode?: number;
    isSuccess: false;
}

interface ISuccessResponse {
    data?: any;
    message?: string;
    statusCode: SuccessHttpStatusCodes;
    isSuccess: true;
}

/* ============= Response ============= */
interface BaseResponsePayload {
    message?: string;
    statusCode: HttpStatusCode;
    isSuccess: boolean;
}

class BaseResponse {
    public readonly message?: string;
    public readonly statusCode: HttpStatusCode;
    public readonly isSuccess: boolean;

    constructor({ message, statusCode, isSuccess }: BaseResponsePayload) {
        this.message = message;
        this.statusCode = statusCode;
        this.isSuccess = isSuccess;
    }
}

/* ============= ErrorResponse ============= */

interface ErrorResponsePayload {
    message: string;
    statusCode: ErrorHttpStatusCodes;
    errorCode?: number;
    error?: any;
}

export class ErrorResponse extends BaseResponse implements IErrorResponse {
    public readonly errorCode?: number;
    public readonly error?: any;
    public readonly statusCode!: ErrorHttpStatusCodes;
    public readonly isSuccess!: false;

    constructor({
        message = 'Проищла ошибка',
        statusCode,
        errorCode,
        error,
    }: ErrorResponsePayload) {
        super({ message, statusCode, isSuccess: false });

        this.errorCode = errorCode;
        this.error = error;
    }
}

/* ============= SuccessResponse ============= */

interface SuccessResponsePaylaod {
    message?: string;
    data?: any;
}

export class SuccessResponse extends BaseResponse implements ISuccessResponse {
    public readonly data?: any;
    public readonly statusCode!: SuccessHttpStatusCodes;
    public readonly isSuccess!: true;

    constructor({ message, data }: SuccessResponsePaylaod = {}) {
        super({ message, statusCode: HttpStatusCode.OK, isSuccess: true });
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
    message?: string;
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

export type Response = IErrorResponse | ISuccessResponse;
