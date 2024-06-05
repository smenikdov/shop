'use client';

import Result from '@/components/Result';
import type { IErrorResponse } from '@/utils/actions/responses';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const response: IErrorResponse = {
        isSuccess: false,
        message: 'Ошибка при загрзке страницы',
        statusCode: 500,
    };

    return (
        <main>
            <Result response={response} />
        </main>
    );
}
