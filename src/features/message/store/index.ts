import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../typings';

export interface MessageState {
    messages: Array<Message>;
}

const initialState: MessageState = {
    messages: [],
};

export const counterSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createMessage: (state, action: PayloadAction<Message>) => {
            state.messages.unshift(action.payload);
        },
        deleteMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload);
        },
    },
});

export const { createMessage, deleteMessage } = counterSlice.actions;

export default counterSlice.reducer;
