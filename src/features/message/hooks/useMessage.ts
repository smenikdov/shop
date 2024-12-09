import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '@/hooks/useStore';
import type { Message } from '../typings';
import {
    messageCreate as messageCreateAction,
    messageDelete as messageDeleteAction,
} from '../store';

const messages: {
    [messegeId: string]: Function;
} = {};

const useMessage = () => {
    const dispatch = useAppDispatch();

    const createMessage = (message: Omit<Message, 'id'>) => {
        const messageId = uuidv4();
        dispatch(
            messageCreateAction({
                ...message,
                id: messageId,
            })
        );
        const promise = new Promise((resolve) => {
            messages[messageId] = resolve;
        });
        return promise;
    };

    const alert = (message: string) => {
        return createMessage({
            title: 'Подтвердите действие',
            message: message,
            type: 'ALERT',
        });
    };

    const confirm = (message: string) => {
        return createMessage({
            title: 'Подтвердите действие',
            message: message,
            type: 'CONFIRM',
        });
    };

    const prompt = (message: string) => {
        return createMessage({
            title: 'Подтвердите действие',
            message: message,
            type: 'PROMPT',
        });
    };

    const confirmMessage = (messageId: string, data) => {
        messages[messageId](data);
        delete messages[messageId];
    };

    return { alert, confirm, prompt, confirmMessage } as const;
};

export default useMessage;
