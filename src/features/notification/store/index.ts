import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '../typings';

export interface NotificationState {
    notifications: Array<Notification>;
}

const initialState: NotificationState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationCreate: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
        },
        notificationDelete: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
});

export const { notificationCreate, notificationDelete } = notificationSlice.actions;

export default notificationSlice.reducer;
