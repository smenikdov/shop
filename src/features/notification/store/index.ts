import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '../typings';

export interface NotificationState {
    notifications: Array<Notification>;
}

const initialState: NotificationState = {
    notifications: [],
};

export const counterSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
        },
        deleteNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
});

export const { createNotification, deleteNotification } = counterSlice.actions;

export default counterSlice.reducer;
