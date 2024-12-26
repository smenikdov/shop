import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '@/hooks/useStore';
import type {
    Message,
    AnyMessageResult,
    AlertResult,
    PromptResult,
    ConfirmResult,
} from '../typings';
import {
    messageCreate as messageCreateAction,
    messageDelete as messageDeleteAction,
} from '../store';

const messages: {
    [messegeId: string]: (messageResult: AnyMessageResult) => void;
} = {};

const useMessage = (id?: string) => {
    const dispatch = useAppDispatch();

    const createMessage = (message: Omit<Message, 'id'>): Promise<AnyMessageResult> => {
        const messageId = uuidv4();
        dispatch(
            messageCreateAction({
                ...message,
                id: messageId,
            })
        );
        const promise = new Promise<AnyMessageResult>((resolve) => {
            messages[messageId] = resolve;
        });
        return promise;
    };

    const alert = (message: string): Promise<AlertResult> => {
        return createMessage({
            title: 'Подтвердите действие',
            message: message,
            type: 'ALERT',
        }) as Promise<AlertResult>;
    };

    const confirm = (message: string): Promise<ConfirmResult> => {
        return createMessage({
            title: 'Подтвердите действие',
            message: message,
            type: 'CONFIRM',
        }) as Promise<ConfirmResult>;
    };

    const prompt = (message: string): Promise<PromptResult> => {
        return createMessage({
            title: 'Подтвердите действие',
            message: message,
            type: 'PROMPT',
        }) as Promise<PromptResult>;
    };

    const confirmMessage = (data: AnyMessageResult) => {
        if (!id) {
            return;
        }
        messages[id](data);
        delete messages[id];
        setTimeout(() => {
            dispatch(messageDeleteAction(id));
        }, 5000);
    };

    return { alert, confirm, prompt, confirmMessage } as const;
};

export default useMessage;
