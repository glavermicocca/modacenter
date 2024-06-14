import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone'
import RedoTwoToneIcon from '@mui/icons-material/RedoTwoTone'
import { Button, Stack, Typography } from '@mui/material'
import { GenericDateFormatShort } from '../../components/DateFormat'
import { useInsertUpdateCarrelloAppoggioMutation } from './ricercaAPI'
import { CarrelloAppoggioObj } from './ricercaSlice'
export interface Props {
    carrelloAppoggio?: CarrelloAppoggioObj
}

const CarrelloAppoggioHistory = ({ carrelloAppoggio }: Props) => {
    const [
        insert, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useInsertUpdateCarrelloAppoggioMutation()

    const handleClick = () => {
        if (carrelloAppoggio !== null) {
            insert({
                DES_RIGA: carrelloAppoggio.DES_RIGA,
                COD_ART: carrelloAppoggio.COD_ART,
                COD_LIST: carrelloAppoggio.COD_LIST,
                // DATI CALCOLATI
                UM: carrelloAppoggio.UM,
                NUM_UM: carrelloAppoggio.NUM_UM,
                UM_CONFEZIONE: carrelloAppoggio.UM_CONFEZIONE,
                NUMERO_CONFEZIONI: carrelloAppoggio.NUMERO_CONFEZIONI,
                CONT_1_CONFEZIONE: carrelloAppoggio.CONT_1_CONFEZIONE,
                QUANT_RIGA: carrelloAppoggio.QUANT_RIGA,
                NOTE: carrelloAppoggio.NOTE,
                UM_BASE: carrelloAppoggio.UM_BASE,
                CONVERS_UM_BASE: carrelloAppoggio.CONVERS_UM_BASE,
                QUANT_UM_BASE: carrelloAppoggio.QUANT_UM_BASE,
                SOLO_MULTIPLI_CONFEZIONE: carrelloAppoggio.SOLO_MULTIPLI_CONFEZIONE,
            })
        }
    }

    if (carrelloAppoggio !== null) {
        return (
            <Button
                variant="contained"
                startIcon={<HistoryTwoToneIcon />}
                endIcon={<RedoTwoToneIcon />}
                onClick={handleClick}
            >
                <Stack direction="column" alignItems="center" gap={0.5}>
                    <Typography>
                        {carrelloAppoggio.QUANT_RIGA} {carrelloAppoggio.UM}
                    </Typography>
                    <Typography variant="caption">{GenericDateFormatShort(carrelloAppoggio.DATA_DOC)}</Typography>
                </Stack>
            </Button>
        )
    }

    return <></>
}

export default CarrelloAppoggioHistory
