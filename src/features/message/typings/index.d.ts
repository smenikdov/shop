import { BaseColors } from '@/typings';

type MessageType = 'ALERT' | 'CONFIRM' | 'PROMPT';

export interface Message {
    title: string;
    message: string;
    id: string;
    type: MessageType;
}
