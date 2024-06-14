import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { ricercaApi } from '../features/ricerca/ricercaAPI'
import ricercaReducer from '../features/ricerca/ricercaSlice'

import { imagesUnsplashApi } from '../features/uploadImagesUnsplash/imagesUnsplashAPI'
import imageUnsplashReducer from '../features/uploadImagesUnsplash/imagesUnsplashSlice'

import { rtkQueryErrorLogger } from './errorCatching'

export const store = configureStore({
    reducer: {
        ricerca: ricercaReducer,
        imageUnsplash: imageUnsplashReducer,
        [ricercaApi.reducerPath]: ricercaApi.reducer,
        [imagesUnsplashApi.reducerPath]: imagesUnsplashApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            rtkQueryErrorLogger,
            ricercaApi.middleware,
            imagesUnsplashApi.middleware,
        ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
