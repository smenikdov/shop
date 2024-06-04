export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    ACCESS_DENIED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

type ErrorHttpStatusCodes =
    | HttpStatusCode.BAD_REQUEST
    | HttpStatusCode.ACCESS_DENIED
    | HttpStatusCode.NOT_FOUND
    | HttpStatusCode.INTERNAL_SERVER;

type SuccessHttpStatusCodes = HttpStatusCode.OK;

interface IErrorResponse {
    error?: any;
    message: string;
    statusCode: ErrorHttpStatusCodes;
    errorCode?: number;
    isSuccess: false;
}

interface ISuccessResponse {
    data: any;
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
    public readonly message!: string;

    constructor({
        message = 'Неизвестная ошибка',
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

interface SuccessResponsePaylaod<DataType extends any> {
    message?: string;
    data: DataType;
}

export class SuccessResponse<DataType extends any>
    extends BaseResponse
    implements ISuccessResponse
{
    public readonly data: DataType;
    public readonly statusCode!: SuccessHttpStatusCodes;
    public readonly isSuccess!: true;

    constructor({ message, data }: SuccessResponsePaylaod<DataType>) {
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

/* ============= AccessDeniedResponse ============= */

interface AccessDeniedResponsePayload {
    message?: string;
    error?: any;
}

export class AccessDeniedResponse extends ErrorResponse {
    constructor({ message = 'Нет доступа', error }: AccessDeniedResponsePayload = {}) {
        super({
            message,
            statusCode: HttpStatusCode.ACCESS_DENIED,
            error,
        });
    }
}

export type Response = IErrorResponse | ISuccessResponse;
