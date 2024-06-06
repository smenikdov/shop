import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/features/product/typings';

export interface BasketState {
    basketItems: Array<Product>;
}

const initialState: BasketState = {
    basketItems: [],
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        basketAddItem: (state, action: PayloadAction<Product>) => {
            state.basketItems.push({
                ...action.payload,
                basketQuantity: 1,
            });
        },

        basketDeleteItem: (state, action: PayloadAction<{ productId: number }>) => {
            state.basketItems = state.basketItems.filter(
                (bi) => bi.id !== action.payload.productId
            );
        },

        basketSetItems: (state, action: PayloadAction<Array<Product>>) => {
            state.basketItems = action.payload;
        },

        basketUpdateQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const basketItem = state.basketItems.find((bi) => bi.id === action.payload.productId)!;
            basketItem.basketQuantity = action.payload.quantity;
        },
    },
});

export const { basketAddItem, basketDeleteItem, basketSetItems, basketUpdateQuantity } =
    basketSlice.actions;

export default basketSlice.reducer;
