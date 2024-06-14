import {
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Typography,
} from '@mui/material'
import 'moment/locale/it'

import { useLocation, useNavigate } from 'react-router-dom'

import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone'

import { useEffect, useState } from 'react'
import { useGetCarrelloAppoggioQuery } from '../ricerca/ricercaAPI'

interface DdtAllProps {
    COD_CF: string
    AZIENDA_ID: string
}

export function CarrelloQuantita() {
    const navigate = useNavigate()

    // PAGINATION

    const { data } = useGetCarrelloAppoggioQuery()

    // DESIGN

    const [dialogContinuosShopping, setDialogContinuosShopping] = useState<boolean>(false)

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    function handleFocus() {
        if (data?.data != null && data?.data.length > 0) {
            setDialogContinuosShopping(() => {
                setTimeoutId(
                    setTimeout(() => {
                        setDialogContinuosShopping(() => {
                            navigate('/carrello')
                            return false
                        })
                    }, 3000)
                )
                return true
            })
        }
    }

    useEffect(() => {
        window.addEventListener('focus', handleFocus)
        return function () {
            window.removeEventListener('focus', handleFocus)
        }
    }, [data?.data.length])

    return (
        <>
            <Dialog
                onClose={() => {
                    clearTimeout(timeoutId)
                    setDialogContinuosShopping(false)
                }}
                maxWidth="sm"
                open={dialogContinuosShopping}
            >
                <DialogTitle>{`Att.ne nel tuo carello ci sono ${data?.data.length} articoli`}</DialogTitle>
                <DialogContent>
                    <LinearProgress />
                    <Typography variant="caption">↗ Tra poco vado al carrello...</Typography>
                </DialogContent>
                <DialogActions>
                    {
                        <Button
                            variant="contained"
                            onClick={(event) => {
                                event.preventDefault()
                                clearTimeout(timeoutId)
                                setDialogContinuosShopping(false)
                            }}
                        >
                            Resta qui
                        </Button>
                    }
                </DialogActions>
            </Dialog>
            <Box
                onClick={() => {
                    navigate('/carrello')
                }}
            >
                <Badge color="secondary" badgeContent={data?.data.length} max={999}>
                    <ShoppingCartCheckoutTwoToneIcon
                        sx={{ fontSize: 36 }}
                        onClick={() => {
                            navigate('/carrello')
                        }}
                    />
                </Badge>
            </Box>
        </>
    )
}
