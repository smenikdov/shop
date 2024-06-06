import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidPrimitiveResult,
    IFileValidator,
} from '@/utils/validate/typings';

const bToMb = (v: number) => v / 1024 / 1024;

const videoMimeTypes = [
    'video/x-flv',
    'video/x-ms-wmv',
    'video/x-msvideo',
    'video/quicktime',
    'video/3gpp',
    'video/MP2T',
    'application/x-mpegURL',
    'video/mp4',
];

const imageMimeTypes = [
    'image/webp',
    'image/tiff',
    'image/svg+xml',
    'image/png',
    'image/jpeg',
    'image/vnd.microsoft.icon',
    'image/gif',
    'image/bmp',
];

export class FileValidator extends Validator implements IFileValidator {
    addRule(rule: ValidationRule) {
        return new FileValidator({ ...this, rules: [...this.rules, rule] });
    }

    lt(size: number, error?: string) {
        return this.addRule({
            validateFunction: (value: File) => bToMb(value.size) < size,
            error: error || `Размер файла должен быть меньше, чем ${size} мб.`,
        });
    }

    lte(size: number, error?: string) {
        return this.addRule({
            validateFunction: (value: File) => bToMb(value.size) <= size,
            error: error || `Размер файла должен быть меньше или равен - ${size} мб.`,
        });
    }

    accept(allowedTypes: Array<string>, error?: string) {
        return this.addRule({
            validateFunction: (value: File) => allowedTypes.includes(value.type),
            error: error || 'Неверный формат файла',
        });
    }

    image() {
        return this.accept(imageMimeTypes, 'Файл должен быть каринкой');
    }

    video() {
        return this.accept(videoMimeTypes, 'Файл должен быть видео');
    }

    pdf() {
        return this.accept(['application/pdf'], 'Файл должен быть PDF');
    }
}
