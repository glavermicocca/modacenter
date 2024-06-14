import { Box, Color, Stack, Typography } from '@mui/material'
import moment from 'moment'
import 'moment/locale/it'
import { useLocation } from 'react-router-dom'
import { CarrelloConfirmResponse, CarrelloTestataAppoggioObj } from '../ricerca/ricercaSlice'

interface InviatiProps {
    gridColor: Color
}

export const fruttaEVerduraEmoji = [
    '🍏',
    '🍎',
    '🍐',
    '🍊',
    '🍋',
    '🍌',
    '🍉',
    '🍇',
    '🍓',
    '🍈',
    '🍒',
    '🍑',
    '🥭',
    '🍍',
    '🥥',
    '🥝',
    '🍅',
    '🍆',
    '🥑',
    '🥦',
    '🥒',
    '🌶️',
    '🌽',
    '🥕',
    '🧄',
    '🧅',
    '🍠',
    '🥔',
]

function elementoCasuale(s: string): string {
    let somma = 0
    for (let i = 0; i < s.length; i++) {
        somma += s.charCodeAt(i)
    }
    return fruttaEVerduraEmoji[somma % fruttaEVerduraEmoji.length]
}

export function mescolaArray(array: Array<string>) {
    const lunghezza = array.length

    for (let i = lunghezza - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
}

export const FormatDataOraRichiesta = (carrellotestataappoggio: CarrelloTestataAppoggioObj) => {
    if (carrellotestataappoggio?.DATA_ORA_RICHIESTA == null) {
        return ''
    }
    const DATA_ORA_RICHIESTA = moment(new Date(carrellotestataappoggio.DATA_ORA_RICHIESTA)).format(
        'ddd D MMM YYYY'
    )

    return DATA_ORA_RICHIESTA
}

export const FormatDataDoc = (carrellotestataappoggio: CarrelloTestataAppoggioObj) => {
    if (carrellotestataappoggio?.DATA_DOC == null) {
        return ''
    }
    const DATA_DOC = moment(new Date(carrellotestataappoggio.DATA_DOC)).format('ddd D MMM YYYY HH:mm')
    return `ID ORDINE : ${carrellotestataappoggio.COD_CHIAVE} ${elementoCasuale(
        carrellotestataappoggio.COD_CHIAVE || ''
    )} ${DATA_DOC}`
}

export function Fatta({ gridColor }: InviatiProps) {
    const location = useLocation()

    const data = location.state as CarrelloConfirmResponse

    return (
        <Box display="grid" textAlign="center" sx={{ mt: 5 }}>
            <Stack direction="column" alignContent="baseline">
                <Typography variant="body1">Codice ordine : </Typography>
                <Typography variant="h3">{data.carrelloTestataAppoggio.COD_CHIAVE}</Typography>
            </Stack>
            <br />
            <Stack direction="column" alignContent="baseline">
                <Typography variant="body1">Data consegna : </Typography>
                <Typography variant="h3">
                    {FormatDataOraRichiesta(data.carrelloTestataAppoggio).toUpperCase()}
                </Typography>
                <Typography variant="h5">
                    {data.carrelloTestataAppoggio.TEMPO_CONSEGNA}
                </Typography>
            </Stack>
            <br />
            <Typography sx={{ mb: 2 }} variant="h5">
                ti abbiamo inviato una e-m@il controlla anche lo SPAM 🥫🥫🥫
            </Typography>
            <img style={{ margin: '0 auto' }} src="images/success-strong.gif" />
        </Box>
    )
}
