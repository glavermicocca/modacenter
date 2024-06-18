import { Box, Button, Color, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import 'moment/locale/it'
import { useState } from 'react'

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import { GenericListItems } from '../../components/GenericListItem'
import { useDeleteOrdineMutation, useGetCarrelloAppoggioQuery } from '../ricerca/ricercaAPI'
import { CarrelloAppoggioObj } from '../ricerca/ricercaSlice'

interface PromoProps {
    gridColor: Color
}

const CarrelloAppoggioList = GenericListItems<CarrelloAppoggioObj>()

export function Carrello({ gridColor }: PromoProps) {
    const { data, isLoading } = useGetCarrelloAppoggioQuery()

    const handleClickElimina = () => {
        setOpenElimina(true)
    }

    const [deleteOrdine] = useDeleteOrdineMutation()

    const [openElimina, setOpenElimina] = useState(false)

    const handleCloseElimina = async () => {
        setOpenElimina(false)
    }

    const handleElimina = async () => {
        try {
            const result = await deleteOrdine().unwrap()
            setOpenElimina(false)
        } catch (error) {
            console.log(error)
        }
    }

    // DESIGN

    return (
        <>
            <Dialog open={openElimina} onClose={handleCloseElimina}>
                <DialogTitle>Svuota il carrello</DialogTitle>
                <DialogContent>
                    <DialogContentText>Att.ne vuoi svuotare tutto il carrello?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseElimina}>No</Button>
                    <Button onClick={handleElimina}>Si</Button>
                </DialogActions>
            </Dialog>
            {data?.data != null && data.data.length > 0 && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button
                        sx={{ m: 1, height: 55 }}
                        size="large"
                        onClick={() => {
                            handleClickElimina()
                        }}
                        variant="contained"
                        color="primary"
                        startIcon={<DeleteForeverTwoToneIcon />}
                    >
                        Svuota il carrello
                    </Button>
                </Box>
            )}
        </>
    )
}
