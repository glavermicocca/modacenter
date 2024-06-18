import { ThemeProvider } from '@emotion/react'
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone'
import { Box, Button, createTheme, CssBaseline, FormControlLabel, Switch, ThemeOptions } from '@mui/material'
import { deepPurple, green, indigo, purple } from '@mui/material/colors'
import { itIT } from '@mui/x-date-pickers/locales'
import { useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom'
import BreadCrumbsCliccable from './BreadCrumbsCliccable'
import ErrorPage from './error-page'
import { Carrello } from './features/carrello/Carrello'
import LoginSide from './features/login/LoginSide'
import PrivateRoute from './features/login/PrivateRoute'
import PrivateRouteRoleAzienda from './features/login/PrivateRouteRoleAzienda'
import { Offerte } from './features/offerte/Offerte'
import ResponsiveDrawer from './ResponsiveDrawer'
import CardQr from './features/cardQr'

const colors = [indigo[500], purple[500]]

// Define theme settings
const light: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: purple[100],
        },
        secondary: {
            main: deepPurple[100],
        },
    },
    //spacing: 8,
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    // backgroundColor: green[900],
                    borderRadius: 10,
                    margin: 10,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    background: `linear-gradient(to right bottom, ${colors.join(',')})`,
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        },
    },
}

const dark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: green[900],
        },
        secondary: {
            main: green[900],
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
                    // backgroundColor: green[900],
                    borderRadius: 10,
                    margin: 10,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    background: `linear-gradient(to right bottom, ${colors.join(',')})`,
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
                    <Box sx={{}} id="back-to-top-anchor">
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
                            <CardQr />
                            <Button>Dettagli</Button>
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
                    path: '/inviati',
                    element: (
                        <PrivateRoute>
                            <p>inviati</p>
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
