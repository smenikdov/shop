import { MessageType } from '@/features/message/typings';

export interface MessageElementProps {
    id: string;
    title: string;
    message: string;
    type: MessageType;
}
