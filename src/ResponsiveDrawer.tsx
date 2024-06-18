import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone'
import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone'
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone'
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone'
import LocalFloristTwoToneIcon from '@mui/icons-material/LocalFloristTwoTone'
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone'
import MenuIcon from '@mui/icons-material/Menu'
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone'
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone'
import SettingsApplicationsTwoToneIcon from '@mui/icons-material/SettingsApplicationsTwoTone'
import ShoppingBasketTwoToneIcon from '@mui/icons-material/ShoppingBasketTwoTone'
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'
import { Fab, ListItemButton, useScrollTrigger, Zoom } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CarrelloQuantita } from './features/carrelloQuantita/CarrelloQuantita'

import { useGetCfQuery, useLogoutPostMutation } from './features/ricerca/ricercaAPI'
import { CfNewObj, LoginRequest, selectUser } from './features/ricerca/ricercaSlice'

const drawerWidth = 340

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window
    children: React.ReactElement
    ToggleTheme?: React.ReactElement
}

function ScrollTop(props: Props) {
    const { children, window } = props
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClickAnchor = (event: React.MouseEvent<HTMLDivElement> | null) => {
        let anchor
        if (event) {
            anchor = ((event?.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor')
        } else {
            anchor = document.querySelector('#back-to-top-anchor')
        }

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <Zoom in={trigger}>
            <Box onClick={handleClickAnchor} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                {children}
            </Box>
        </Zoom>
    )
}

export default function ResponsiveDrawer(props: Props) {
    const user = useAppSelector(selectUser)

    const { window, children, ToggleTheme } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const navigate = useNavigate()

    const location = useLocation()

    const [
        postLogout, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useLogoutPostMutation()

    const handleClick = async () => {
        const rest = await postLogout({
            E_MAIL_CF: user?.cf.E_MAIL_CF,
        } as LoginRequest).unwrap()

        setTimeout(() => {
            navigate('/login')
        }, 500)
    }

    const { data: cfData } = useGetCfQuery()

    const cf: CfNewObj | null = cfData?.data?.cf ?? null

    const drawer = (
        <div>
            <List>
                <ListItem>
                    <img style={{ width: drawerWidth * 0.85 }} src={'/logo192.png'}></img>
                </ListItem>
                <ListItem>{ToggleTheme}</ListItem>
                <ListItem component={Link} to="/" button onClick={handleDrawerToggle}>
                    <ListItemIcon>{<StorefrontTwoToneIcon />}</ListItemIcon>
                    <ListItemText primary={'Negozio'} />
                </ListItem>
                {cf?.cfCliUser.FLAG_WEB_OFFERTE == 1 && (
                    <ListItem component={Link} to="/offerte" button onClick={handleDrawerToggle}>
                        <ListItemIcon>{<SavingsTwoToneIcon />}</ListItemIcon>
                        <ListItemText primary={'Offerte'} />
                    </ListItem>
                )}
                <ListItem component={Link} to="/carrello" button onClick={handleDrawerToggle}>
                    <ListItemIcon>{<ShoppingBasketTwoToneIcon />}</ListItemIcon>
                    <ListItemText primary={'Carrello'} />
                </ListItem>
                <ListItem component={Link} to="/inviati" button onClick={handleDrawerToggle}>
                    <ListItemIcon>{<FactCheckTwoToneIcon />}</ListItemIcon>
                    <ListItemText primary={'Inviati'} />
                </ListItem>
            </List>
            {user?.azienda != null && (
                <List>
                    <Divider />
                    <ListItem component={Link} to="/fotoArticoli" button onClick={handleDrawerToggle}>
                        <ListItemIcon>{<LocalFloristTwoToneIcon />}</ListItemIcon>
                        <ListItemText primary={'Foto articoli'} />
                    </ListItem>
                </List>
            )}
            <Divider />
            {user?.cf != null && (
                <ListItemButton component="a" onClick={handleClick}>
                    <ListItemIcon>{<LockTwoToneIcon />}</ListItemIcon>
                    <ListItemText primary={`${user.cf.COD_CF} ${user.cf.E_MAIL_CF}`} secondary="logout" />
                </ListItemButton>
            )}
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon>{<DataObjectTwoToneIcon />}</ListItemIcon>
                    <ListItemText primary={`${process.env.REACT_APP_VERSION}`} secondary={'Versione webApp'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem target={'_blank'} component="a" href="https://www.prosyt.it">
                    <ListItemIcon>{<PaidTwoToneIcon />}</ListItemIcon>
                    <ListItemText primary={'Prosyt'} />
                </ListItem>
            </List>
        </div>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    let strLocation = ''
    let icon = <></>

    switch (location.pathname) {
        case '/':
            strLocation = 'Negozio'
            icon = <StorefrontTwoToneIcon fontSize="large" />
            break
        case '/offerte':
            strLocation = 'Offerte'
            icon = <SavingsTwoToneIcon fontSize="large" />
            break
        case '/inviati':
            strLocation = 'Inviati'
            icon = <FactCheckTwoToneIcon fontSize="large" />
            break
        case '/carrello':
            strLocation = 'Carrello'
            icon = <ShoppingBasketTwoToneIcon fontSize="large" />
            break
        case '/destinazione':
            strLocation = 'Destinazione'
            icon = <AssistantDirectionTwoToneIcon fontSize="large" />
            break
        case '/impostazioni':
            strLocation = 'Impostazioni'
            icon = <SettingsApplicationsTwoToneIcon fontSize="large" />
            break
        case '/fotoArticoli':
            strLocation = 'Foto articoli'
            icon = <LocalFloristTwoToneIcon fontSize="large" />
            break
    }

    return (
        <>
            <AppBar
                sx={{
                    mr: '1%',
                    ml: '1%',
                    width: '98%',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {icon}
                    <Typography
                        sx={{ ml: 2, flexGrow: 1, textTransform: 'uppercase', fontWeight: 'bold' }}
                        variant="h5"
                        noWrap
                        component="div"
                    >
                        {strLocation}
                    </Typography>
                    {user?.cf != null && <CarrelloQuantita />}
                </Toolbar>
                {location.pathname === '/offerte' && (
                    <img
                        src={'/background/tag.svg'}
                        style={{
                            top: '35px',
                            height: '70px',
                            right: '25px',
                            position: 'absolute',
                            zIndex: 0,
                        }}
                    />
                )}
            </AppBar>

            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Box sx={{ mt: 1 }}>{children}</Box>
            {/* <Fab sx={{
                position: "fixed",
                left: "50%",
                transform: "translateX(-50%)", bottom: 16
            }} color="secondary" size="small" onClick={() => { navigate(-1) }}>
                <ArrowBackTwoToneIcon />
            </Fab> */}
            <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpTwoToneIcon />
                </Fab>
            </ScrollTop>
        </>
    )
}
