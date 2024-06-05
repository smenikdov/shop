import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasketItem } from '../typings';

export interface BasketState {
    basketItems: Array<BasketItem>;
}

export const LOCAL_STORAGE_BASKET = 'basket';

const initialState: BasketState = {
    basketItems: [],
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        basketAddItem: (state, action: PayloadAction<{ productId: number }>) => {
            state.basketItems.push({
                productId: action.payload.productId,
                quantity: 1,
            });
        },

        basketDeleteItem: (state, action: PayloadAction<{ productId: number }>) => {
            state.basketItems = state.basketItems.filter(
                (bi) => bi.productId !== action.payload.productId
            );
        },

        basketSetItems: (state, action: PayloadAction<Array<BasketItem>>) => {
            state.basketItems = action.payload;
        },

        basketUpdateQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const basketItem = state.basketItems.find(
                (bi) => bi.productId === action.payload.productId
            );
            if (basketItem) {
                basketItem.quantity = action.payload.quantity;
            }
        },
    },
    selectors: {
        basketGetOneItem: (state, productId) =>
            state.basketItems.find((bi) => bi.productId === productId),
    },
});

export const { basketAddItem, basketDeleteItem, basketSetItems, basketUpdateQuantity } =
    basketSlice.actions;

export default basketSlice.reducer;
