import 'server-only';
import path from 'path';
import { writeFile, readFile, unlink } from 'fs/promises';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';
import { SuccessResponse } from '@/utils/actions/responses';

const FILES_DIR = './public/uploads/';

export const fileSave = new Handler({
    name: 'Сохранение файла',
    defaultError: 'Ошибка при сохранении файла',
    schema: v.object({
        file: v.file().lt(10),
        name: v.string(),
    }),

    async request(payload: { file: File; name: string }) {
        const arrayBuffer = await payload.file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = FILES_DIR + payload.name;
        await writeFile(filePath, buffer);
        return new SuccessResponse({});
    },
});

export const fileRead = new Handler({
    name: 'Получение файла',
    defaultError: 'Ошибка при получении файла',
    schema: v.object({
        name: v.string(),
    }),

    async request(payload: { name: string }) {
        const filePath = FILES_DIR + payload.name;
        const file = await readFile(filePath);
        return new SuccessResponse({ data: file });
    },
});

export const fileDelete = new Handler({
    name: 'Удаление файла',
    defaultError: 'Ошибка при удалении файла',
    schema: v.object({
        name: v.string(),
    }),

    async request(payload: { name: string }) {
        const filePath = FILES_DIR + payload.name;
        await unlink(filePath);
        return new SuccessResponse();
    },
});
