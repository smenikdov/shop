import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '@/hooks/useStore';
import type { Message } from '../typings';
import {
    createMessage as createMessageAction,
    deleteMessage as deleteMessageAction,
} from '../store';

const useMessage = () => {
    const dispatch = useAppDispatch();

    const createMessage = (message: Omit<Message, 'id'>) => {
        const messageId = uuidv4();
        dispatch(
            createMessageAction({
                ...message,
                id: messageId,
            })
        );
    };

    const alert = (message: string) => {
        createMessage({
            title: 'Подтвердите действие',
            message: message,
        });
    };

    const confirm = (message: string) => {
        createMessage({
            title: 'Подтвердите действие',
            message: message,
        });
    };

    return { alert, confirm } as const;
};

export default useMessage;
