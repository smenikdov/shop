import 'server-only';
import { cookies as getCookies, headers as getHeaders } from 'next/headers';
import { decrypt } from '@/features/auth/utils/crypto';
import { IObjectValidator } from '@/utils/validate/typings';
import { deepClone } from '@/utils/helpers';
import logger from '@/lib/logger';
import { UserRole } from '@prisma/client';
import type { AnyObject } from '@/typings';
import type { AccessTokenPayload } from '@/features/auth/typings';

import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    AccessDeniedResponse,
} from '@/utils/actions/responses';

interface HandlerParams<RequestPayload extends AnyObject = {}> {
    name: string;
    description?: string;
    defaultError: string;
    schema?: IObjectValidator;
    request: (payload: RequestPayload) => Promise<Response>;
}
export class Handler<RequestPayload extends AnyObject = {}> {
    public readonly name: string;
    public readonly description: string | null;
    public readonly defaultError: string;
    public readonly schema?: IObjectValidator;
    public readonly request: (payload: RequestPayload) => Promise<Response>;

    constructor({
        name,
        description,
        defaultError,
        schema,
        request,
    }: HandlerParams<RequestPayload>) {
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
                    const error = validationResult.errors;
                    const response = new RequestErrorResponse({
                        message:
                            'Сервер понял запрос, но отказался его выполнять. Причина: передан некоректный запрос',
                        error,
                    });
                    return response;
                }
            }

            return this.request(payload);
        } catch (error) {
            logger.error(this.name, error);
            // await sendMailToAdminIfCritical();
            // await sendEventsToSentry();
            return new ServerErrorResponse({ message: this.defaultError });
        }
    }
}

interface RouteParams<RoutePayload extends AnyObject = {}> {
    access?: Array<UserRole>;
    handler: (object: {
        payload: RoutePayload;
        accessTokenData?: AccessTokenPayload;
    }) => Promise<Response>;
}

export function createRoute<RoutePayload extends AnyObject = {}>({
    access,
    handler,
}: RouteParams<RoutePayload>) {
    return async function (payload: RoutePayload | FormData): Promise<Response> {
        const cookies = getCookies();
        const accessToken = cookies.get('accessToken')?.value;
        const accessTokenData = await decrypt(accessToken);
        if (access) {
            const userRole = accessTokenData?.userRole as UserRole | undefined;
            if (!userRole || !access.includes(userRole)) {
                return new AccessDeniedResponse();
            }
        }
        if (payload && payload instanceof FormData) {
            payload = Object.fromEntries(payload.entries()) as RoutePayload;
        }
        const response = await handler({
            payload,
            accessTokenData: accessTokenData as AccessTokenPayload | undefined,
        });
        return deepClone(response);
    };
}
