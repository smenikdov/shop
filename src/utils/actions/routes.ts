import 'server-only';
import { cookies as getCookies, headers as getHeaders } from 'next/headers';
import { decrypt } from '@/features/auth/utils/crypto';
import { IObjectValidator } from '@/utils/validate/typings';
import { deepClone } from '@/utils/helpers';
import logger from '@/lib/logger';
import { UserRole } from '@prisma/client';
import type { AnyObject } from '@/typings';
import type { AccessTokenPayload } from '@/features/auth/typings';

export interface RouteData<T extends AnyObject = {}> {
    payload: T;
    accessTokenData?: AccessTokenPayload;
}

import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    AccessDeniedResponse,
} from '@/utils/actions/responses';

interface HandlerParams<
    RequestPayload extends AnyObject = {},
    RequestResponse extends Response = Response,
    Errors extends AnyObject = {},
> {
    name: string;
    description?: string;
    errors: Errors;
    schema?: IObjectValidator;
    request: (payload: RequestPayload, errors: Errors) => Promise<RequestResponse>;
}
export class Handler<
    RequestPayload extends AnyObject = {},
    RequestResponse extends Response = Response,
    Errors extends AnyObject = {},
> {
    public readonly name: string;
    public readonly description: string | null;
    public readonly errors: AnyObject;
    public readonly schema?: IObjectValidator;
    public readonly request: (payload: RequestPayload, errors: Errors) => Promise<RequestResponse>;

    constructor({
        name,
        description,
        errors,
        schema,
        request,
    }: HandlerParams<RequestPayload, RequestResponse, Errors>) {
        this.name = name;
        this.description = description || null;
        this.errors = errors;
        this.schema = schema;
        this.request = request;
    }

    async execute(payload: RequestPayload) {
        try {
            if (this.schema) {
                if (!payload) {
                    const response = new RequestErrorResponse({
                        message: 'Сервер не получил данные',
                    });
                    return response;
                }
                const validationResult = this.schema.validate(payload);
                if (!validationResult.isValid) {
                    const error = validationResult.error;
                    const response = new RequestErrorResponse({
                        message:
                            'Сервер понял запрос, но отказался его выполнять. Причина: передан некорректный запрос',
                        error,
                    });
                    return response;
                }
            }
            return await this.request(payload, this.errors);
        } catch (error) {
            logger.error(this.name, error);
            // await sendMailToAdminIfCritical();
            // await sendEventsToSentry();
            return new ServerErrorResponse({ message: this.errors.default || 'Неизвестная ошибка' });
        }
    }
}

interface RouteParams<
    RoutePayload extends AnyObject = {},
    RouteResponse extends Response = Response,
> {
    access?: Array<UserRole>;
    handler: (object: {
        payload: RoutePayload;
        accessTokenData?: AccessTokenPayload;
    }) => Promise<RouteResponse>;
}

export function createRoute<
    RoutePayload extends AnyObject = {},
    RouteResponse extends Response = Response,
>({ access, handler }: RouteParams<RoutePayload, RouteResponse>) {
    return async function (payload: RoutePayload) {
        const cookies = getCookies();
        const accessToken = cookies.get('accessToken')?.value;
        const accessTokenData = await decrypt(accessToken);
        if (access) {
            const userRole = accessTokenData?.userRole as UserRole | undefined;
            if (!userRole || !access.includes(userRole)) {
                // TODO 
                return deepClone(new AccessDeniedResponse()) as RouteResponse;
            }
        }
        const response = await handler({
            payload,
            accessTokenData: accessTokenData as AccessTokenPayload | undefined,
        });
        return deepClone(response) as RouteResponse;
    };
}