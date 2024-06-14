import { ThemeProvider } from '@emotion/react'
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone'
import { Box, createTheme, CssBaseline, FormControlLabel, Switch, ThemeOptions } from '@mui/material'
import { green } from '@mui/material/colors'
import { itIT } from '@mui/x-date-pickers/locales'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom'
import BreadCrumbsCliccable from './BreadCrumbsCliccable'
import ErrorPage from './error-page'
import { Carrello } from './features/carrello/Carrello'
import { Destinazine } from './features/destinazione/Destinazione'
import { Fatta } from './features/fatta/Fatta'
import { Inviati } from './features/inviati/Inviati'
import ChangePassworkToken from './features/login/ChangePassworkToken'
import LoginSide from './features/login/LoginSide'
import PrivateRoute from './features/login/PrivateRoute'
import PrivateRouteRoleAzienda from './features/login/PrivateRouteRoleAzienda'
import RegistrationToken from './features/login/RegistrationToken'
import { ResetPassword } from './features/login/ResetPassword'
import { Offerte } from './features/offerte/Offerte'
import { Ricerca } from './features/ricerca/Ricerca'
import { Images } from './features/uploadImages/Images'
import ResponsiveDrawer from './ResponsiveDrawer'

// Define theme settings
const light: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: green[900],
        },
        secondary: {
            main: green[200],
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 10,
    },
}

const dark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: green[300],
        },
        secondary: {
            main: green[100],
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 10,
    },
}

function App() {
    // The light theme is used by default
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    
    useEffect(() => {
        // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        //     setIsDarkTheme(e.matches)
        // })
    }, [])

    const theme = isDarkTheme ? createTheme(dark, itIT) : createTheme(light, itIT)

    const offerte: RouteObject = {
        path: '/offerte',
        element: (
            <PrivateRoute>
                <Offerte gridColor={green} />
            </PrivateRoute>
        ),
    }

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <LoginSide />,
        },
        // {
        //     path: '/registration',
        //     element: <Registration />,
        // },
        {
            path: '/registrationToken',
            element: <RegistrationToken />,
        },
        {
            path: '/changePasswordToken',
            element: <ChangePassworkToken />,
        },
        {
            path: '/resetPassword',
            element: <ResetPassword />,
        },
        {
            path: '/',
            element: (
                <ResponsiveDrawer
                    ToggleTheme={
                        <FormControlLabel
                            control={
                                <>
                                    <Switch checked={isDarkTheme} onChange={changeTheme} />
                                    <Brightness4TwoToneIcon />
                                </>
                            }
                            label=""
                            labelPlacement="start"
                            sx={{ flexGrow: 1, mr: 2 }}
                        />
                    }
                >
                    <Box
                        sx={{
                            mt: theme.spacing(12),
                            ml: theme.spacing(1),
                            mr: theme.spacing(1),
                            mb: theme.spacing(10),
                            alignContent: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                        id="back-to-top-anchor"
                    >
                        <BreadCrumbsCliccable />
                        <Outlet />
                    </Box>
                </ResponsiveDrawer>
            ),
            children: [
                {
                    index: true,
                    path: '/',
                    element: (
                        <PrivateRoute>
                            <Ricerca />
                        </PrivateRoute>
                    ),
                },
                offerte,
                {
                    path: '/fotoArticoli',
                    element: (
                        <PrivateRouteRoleAzienda>
                            <Images gridColor={green} />
                        </PrivateRouteRoleAzienda>
                    ),
                },
                {
                    path: '/carrello',
                    element: (
                        <PrivateRoute>
                            <Carrello gridColor={green} />
                        </PrivateRoute>
                    ),
                },
                {
                    path: '/destinazione',
                    element: (
                        <PrivateRoute>
                            <Destinazine />
                        </PrivateRoute>
                    ),
                },
                {
                    path: '/inviati',
                    element: (
                        <PrivateRoute>
                            <Inviati gridColor={green} />
                        </PrivateRoute>
                    ),
                },
                {
                    path: '/fatta',
                    element: (
                        <PrivateRoute>
                            <Fatta gridColor={green} />
                        </PrivateRoute>
                    ),
                },
            ],
            errorElement: <ErrorPage />,
        },
    ])

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <Footer /> */}
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    )
}

export default App
