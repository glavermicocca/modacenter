import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit'
import { snackActions } from '../SnackbarUtilsConfigurator'
//import { toast } from 'your-cool-library'
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        if (action.payload.status === 500) {
            snackActions.error(action?.payload?.data?.message)
        } else if (action.payload.status === 409) {
            snackActions.error(action?.payload?.data?.message)
        } else if (action.payload.status === 'PARSING_ERROR') {
            snackActions.error(action.payload.data)
        } else {
            snackActions.error(action?.error?.message + JSON.stringify(action?.error))
        }

        //console.warn('We got a rejected action!')
        if (action?.payload?.status === 404) {
            window?.location.replace('/login')
        }
    }

    return next(action)
}
