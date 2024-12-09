import { BaseColors } from '@/typings';

type MessageType = 'ALERT' | 'CONFIRM' | 'PROMPT';

export interface Message {
    title: string;
    message: string;
    id: string;
    type: MessageType;
}

export type AlertResult = { close: true } | { ok: true };

export type ConfirmResult = { close: true } | { ok: true } | { cancel: true };

export type PromptResult = { close: true } | { ok: true; message: string } | { cancel: true };

export type AnyMessageResult = AlertResult | ConfirmResult | PromptResult;
