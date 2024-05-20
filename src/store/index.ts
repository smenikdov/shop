import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '@/features/notification/store';
import messageReducer from '@/features/message/store';

export const makeStore = () => {
    return configureStore({
        reducer: {
            notification: notificationReducer,
            message: messageReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
