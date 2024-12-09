import { BaseColors } from '@/typings';

type MessageType = 'ALERT' | 'CONFIRM' | 'PROMPT';

export interface Message {
    title: string;
    message: string;
    id: string;
    type: MessageType;
}

export interface MessageClose { close: true, ok?: undefined, cancel?: undefined };
export interface MessageOk { close?: undefined, ok: true, cancel?: undefined };
export interface MessageCancel { close?: undefined, ok?: undefined, cancel: true };
export interface MessageOkPrompt extends MessageOk {
    input: stirng;
};

export type AlertResult = MessageClose | MessageOk | MessageCancel;

export type ConfirmResult = MessageClose | MessageOk | MessageCancel;

export type PromptResult = MessageClose | MessageOkPrompt | MessageCancel;

export type AnyMessageResult = AlertResult | ConfirmResult | PromptResult;
