import 'server-only';
import { cookies as getCookies, headers as getHeaders } from 'next/headers';
import { decrypt } from '@/features/auth/utils/crypto';
import { IObjectValidator } from '@/utils/validate/typings';
import { deepClone } from '@/utils/helpers';
import logger from '@/lib/logger';
import { UserRole } from '@prisma/client';

import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    AccessDeniedResponse,
} from '@/utils/actions/responses';

interface HandlerParams<RequestArgs extends any[]> {
    name: string;
    description?: string;
    defaultError: string;
    request: (...args: RequestArgs) => Promise<Response>;
}
export class Handler<RequestArgs extends any[]> {
    public readonly name: string;
    public readonly defaultError: string;
    public readonly description: string | null;
    public readonly request: (...args: RequestArgs) => Promise<Response>;

    constructor({ name, description, defaultError, request }: HandlerParams<RequestArgs>) {
        this.name = name;
        this.description = description || null;
        this.defaultError = defaultError;
        this.request = request;
    }

    async execute(...args: RequestArgs) {
        try {
            return this.request(...args);
        } catch (error) {
            logger.error(this.name, error);
            // await sendMailToAdminIfCritical();
            // await sendEventsToSentry();
            return new ServerErrorResponse({ message: this.defaultError });
        }
    }
}

interface RouteParams {
    schema?: IObjectValidator;
    access?: Array<UserRole>;
    handler: {
        execute: (...args: any[]) => Promise<Response>;
    };
}

export function createRoute({ schema, access, handler }: RouteParams) {
    return async function (formData?: FormData): Promise<Response> {
        const cookies = getCookies();
        const accessToken = cookies.get('accessToken')?.value;
        const accessTokenData = await decrypt(accessToken);

        if (access) {
            const userRole = accessTokenData?.userRole as UserRole | undefined;
            if (!userRole || !access.includes(userRole)) {
                return new AccessDeniedResponse();
            }
        }

        if (!formData) {
            const response = await handler.execute();
            return deepClone(response);
        }

        const object = Object.fromEntries(formData.entries());
        if (schema) {
            const validationResult = schema.validate(object);
            if (!validationResult.isValid) {
                const error = validationResult.errors;
                const response = new RequestErrorResponse({
                    message: 'Не валидно',
                    error,
                });
                return deepClone(response);
            }
        }
        const response = await handler.execute(object);
        return deepClone(response);
    };
}
