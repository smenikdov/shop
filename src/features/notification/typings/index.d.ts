import { BaseColors } from '@/typings';

export interface Notification {
    title: string;
    message: string;
    timeOut: number;
    color: BaseColors;
    id: string;
}
