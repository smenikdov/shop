import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import notificationReducer from '@/features/notification/store';
import messageReducer from '@/features/message/store';
import basketReducer, {
    basketAddItem,
    basketDeleteItem,
    basketUpdateQuantity,
    LOCAL_STORAGE_BASKET,
} from '@/features/basket/store';

export const makeStore = () => {
    const basketLocalStorageMiddleware = createListenerMiddleware();
    basketLocalStorageMiddleware.startListening({
        matcher: isAnyOf(basketAddItem, basketDeleteItem, basketUpdateQuantity),
        effect: (action, listenerApi) => {
            console.log(12345, listenerApi);
            // TODO
            // localStorage.setItem(
            //     LOCAL_STORAGE_BASKET,
            //     JSON.stringify(listenerApi.getState().cart.items)
            // ),
        },
    });

    // const LOCAL_STORAGE_FAVORITE = 'favorite';

    return configureStore({
        reducer: {
            notification: notificationReducer,
            message: messageReducer,
            basket: basketReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(basketLocalStorageMiddleware.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
