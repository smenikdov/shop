'use client';

import React from 'react';

import useOnMount from '@/hooks/useOnMount';
import useNotification from '@/features/notification/hooks/useNotification';
import { useAppDispatch } from '@/hooks/useStore';

interface InitialDataContext {
    isUserAuthorized: boolean;
}

const InitialDataContext = React.createContext<InitialDataContext>({
    isUserAuthorized: false,
});

export const InitialDataProvider = ({ children }: { children: React.ReactNode }) => {
    const { notifyError, notifySuccess } = useNotification();
    const dispatch = useAppDispatch();

    const initialData = {
        isUserAuthorized: true,
    };

    const userInitialize = async () => {
        // if (initialData.isUserAuthorized) {
        //     const response = await basketGetAllItemsServerAction({});
        //     if (!response.isSuccess) {
        //         notifyError(response.message);
        //         return;
        //     }
        //     dispatch(basketSetItemsAction(response.data));
        // } else {
        //     //
        //     dispatch(basketSetItemsAction());
        // }
    };

    useOnMount(() => {
        userInitialize();
    });

    return (
        <InitialDataContext.Provider value={initialData}>{children}</InitialDataContext.Provider>
    );
};

export const useInitialData = () => {
    const context = React.useContext(InitialDataContext);
    return context;
};
