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
> {
    name: string;
    description?: string;
    defaultError: string;
    schema?: IObjectValidator;
    request: (payload: RequestPayload) => Promise<RequestResponse>;
}
export class Handler<
    RequestPayload extends AnyObject = {},
    RequestResponse extends Response = Response,
> {
    public readonly name: string;
    public readonly description: string | null;
    public readonly defaultError: string;
    public readonly schema?: IObjectValidator;
    public readonly request: (payload: RequestPayload) => Promise<RequestResponse>;

    constructor({
        name,
        description,
        defaultError,
        schema,
        request,
    }: HandlerParams<RequestPayload, RequestResponse>) {
        this.name = name;
        this.description = description || null;
        this.defaultError = defaultError;
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
                            'Сервер понял запрос, но отказался его выполнять. Причина: передан некоректный запрос',
                        error,
                    });
                    return response;
                }
            }
            return await this.request(payload);
        } catch (error) {
            logger.error(this.name, error);
            // await sendMailToAdminIfCritical();
            // await sendEventsToSentry();
            return new ServerErrorResponse({ message: this.defaultError });
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
                return new AccessDeniedResponse();
            }
        }
        const response = await handler({
            payload,
            accessTokenData: accessTokenData as AccessTokenPayload | undefined,
        });
        return deepClone(response) as RouteResponse;
    };
}
