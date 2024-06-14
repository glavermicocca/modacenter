import { SnackbarProvider } from 'notistack'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Button } from '@mui/material'
import { SnackbarUtilsConfigurator } from './SnackbarUtilsConfigurator'

const container = document.getElementById('root')!
const root = createRoot(container)

// add action to all snackbars
const notistackRef = React.createRef<SnackbarProvider>()
const onClickDismiss = (key: any) => () => {
    notistackRef?.current?.closeSnackbar(key)
}

root.render(
    <Provider store={store}>
        <SnackbarProvider
            dense
            ref={notistackRef}
            action={(key) => <Button onClick={onClickDismiss(key)}>Annulla</Button>}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            maxSnack={3}
        >
            <SnackbarUtilsConfigurator />
            <App />
        </SnackbarProvider>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
