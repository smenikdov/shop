import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../typings';

export interface MessageState {
    messages: Array<Message>;
}

const initialState: MessageState = {
    messages: [],
};

export const messageSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        messageCreate: (state, action: PayloadAction<Message>) => {
            state.messages.unshift(action.payload);
        },
        messageDelete: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload);
        },
    },
});

export const { messageCreate, messageDelete } = messageSlice.actions;

export default messageSlice.reducer;
