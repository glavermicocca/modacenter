import { ThemeProvider } from '@emotion/react'
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone'
import { Box, Button, createTheme, CssBaseline, FormControlLabel, Switch, ThemeOptions } from '@mui/material'
import { green } from '@mui/material/colors'
import { itIT } from '@mui/x-date-pickers/locales'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom'
import BreadCrumbsCliccable from './BreadCrumbsCliccable'
import ErrorPage from './error-page'
import { Carrello } from './features/carrello/Carrello'
import { Destinazine } from './features/destinazione/Destinazione'
import { Fatta } from './features/fatta/Fatta'
import LoginSide from './features/login/LoginSide'
import PrivateRoute from './features/login/PrivateRoute'
import PrivateRouteRoleAzienda from './features/login/PrivateRouteRoleAzienda'
import { Offerte } from './features/offerte/Offerte'
import ResponsiveDrawer from './ResponsiveDrawer'

// Define theme settings
const light: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: green[200],
        },
        secondary: {
            main: green[200],
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: green[900],
                    borderRadius: 10,
                    margin: 10,
                },
            },
        },
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
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: green[300],
                },
            },
        },
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
                    path: '/modacenter',
                    element: (
                        <>
                            <Button>PIPPO</Button>
                            <p>ricerca</p>
                        </>
                        // <PrivateRoute>

                        // </PrivateRoute>
                    ),
                },
                offerte,
                {
                    path: '/fotoArticoli',
                    element: (
                        <PrivateRouteRoleAzienda>
                            <p>private</p>
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
                            <p>inviati</p>
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
