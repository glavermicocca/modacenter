import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { ricercaApi } from '../features/ricerca/ricercaAPI'
import ricercaReducer from '../features/ricerca/ricercaSlice'

import { rtkQueryErrorLogger } from './errorCatching'

export const store = configureStore({
    reducer: {
        ricerca: ricercaReducer,
        [ricercaApi.reducerPath]: ricercaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            rtkQueryErrorLogger,
            ricercaApi.middleware,
        ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
