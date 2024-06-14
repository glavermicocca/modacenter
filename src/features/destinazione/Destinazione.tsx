import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import 'moment/locale/it'
import { useState } from 'react'

import { GenericListItems } from '../../components/GenericListItem'
import { useGetCarrelloAppoggioQuery, useGetCfQuery } from '../ricerca/ricercaAPI'
import { CfDestMerceObj } from '../ricerca/ricercaSlice'
import DataOraConsegna from './DataOraConsegna'
import { DestinazioneItem } from './DestinazioneItem'

import AccessAlarmsTwoToneIcon from '@mui/icons-material/AccessAlarmsTwoTone'
import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import dayjs, { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { snackActions } from '../../SnackbarUtilsConfigurator'
import { useInsertOrdineMutation } from '../ricerca/ricercaAPI'
import { TempoConsegna } from './TempoItem'

const CfDestMerceLL = GenericListItems<CfDestMerceObj>()

export const NO_DESTINAZIONE = -1

const commonStyles = {
    p: 2,
    m: 1,
    border: 0.5,
    borderRadius: 1,
}

export function Destinazine() {
    const { data: carrello } = useGetCarrelloAppoggioQuery()

    const { data: cfCliUser } = useGetCfQuery()

    const [tempoConsegnaSelected, setTempoConsegnaSelected] = useState<TempoConsegna | null>()

    const [dateTimeSelected, setDateTimeSelected] = useState<Dayjs>(dayjs())

    // DESIGN

    const [insert] = useInsertOrdineMutation()

    const [noteStampa, setNoteStampa] = useState<string>('')

    const navigate = useNavigate()

    const handleClose = async () => {
        if (tempoConsegnaSelected == null) {
            snackActions.info(`Indica quando vuoi ricevere la merce ⏰`)
        } else {
            setDestinazioneSelected(NO_DESTINAZIONE)
            const result = await insert({
                DATA_ORA_RICHIESTA: dateTimeSelected.toDate(),
                TIPO_DOCUMENTO: 'OFF_CLI',
                NOTE_STAMPA: noteStampa,
                DATA_DOC: new Date(),
                NUM_DEST: Number(destinazioneSelected),
                TEMPO_CONSEGNA: tempoConsegnaSelected,
            }).unwrap()
            navigate('/fatta', { state: result.data })
        }
    }

    const isDestinazioni =
        cfCliUser?.data != null && cfCliUser.data.cf != null ? cfCliUser?.data?.cf?.cfDestMerce?.length > 0 : false

    const isDestinazioniOnlyOne = isDestinazioni == true ? cfCliUser?.data.cf.cfDestMerce.length === 1 : false

    const NUM_DEST = carrello?.data.find((item) => item.NUM_DEST_COPY != null)?.NUM_DEST_COPY || NO_DESTINAZIONE

    const destinazioneIniziale =
        isDestinazioniOnlyOne == true ? cfCliUser?.data.cf.cfDestMerce[0].NUM_DEST || NO_DESTINAZIONE : NUM_DEST

    const [destinazioneSelected, setDestinazioneSelected] = useState<number | null>(destinazioneIniziale)

    if (carrello?.data == null || (carrello.data != null && carrello.data.length == 0))
        return <Typography variant="h1">🤷‍♂️</Typography>

    if (cfCliUser == null)
        return (
            <Typography variant="h1">
                Il tuo cliente non è impostato correttamente - contatta l'amministrazione!
            </Typography>
        )

    if (destinazioneSelected == null)
        return <Typography variant="h5">Nessuna destinazione configurata - contatta la sede per inserirla</Typography>

    return (
        <Grid mt={5} container direction="row" justifyContent="space-between" textAlign="center">
            <Grid item xs={12}>
                <Typography variant="h6" fontStyle="italic" mb={6}>
                    🫡 completa i riquadri 1. 2. e 3. per inviare l'ordine ✋
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h4" fontStyle="italic">
                    1. <AccessAlarmsTwoToneIcon />
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Box sx={{ ...commonStyles, borderColor: 'primary.main' }}>
                    <Stack direction="column" textAlign="start">
                        <Stack direction="row" spacing={1}>
                            <Typography fontStyle="italic" variant="h6">
                                Quando?
                            </Typography>
                        </Stack>
                        <DataOraConsegna
                            setDate={function (dateTime: Dayjs): void {
                                setDateTimeSelected(dateTime)
                            }}
                            setTempoSelected={(tempo: TempoConsegna | null) => {
                                setTempoConsegnaSelected(tempo)
                            }}
                            cfCliUserObj={cfCliUser.data}
                        />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h4" fontStyle="italic">
                    2. <AssistantDirectionTwoToneIcon />
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Box sx={{ ...commonStyles, borderColor: 'primary.main' }}>
                    <Stack direction="column" textAlign="start">
                        <Typography fontStyle="italic" variant="h6">
                            Dove?
                        </Typography>
                        <CfDestMerceLL
                            isLoading={false}
                            data={cfCliUser.data.cf.cfDestMerce}
                            render={(cfDestMerce) => (
                                <DestinazioneItem
                                    isDisabled={tempoConsegnaSelected == null}
                                    NUM_DEST_SELECTED={destinazioneSelected}
                                    item={cfDestMerce}
                                    key={cfDestMerce.NUM_DEST}
                                    setNUM_DEST_SELECTED={function (NUM_DEST: number) {
                                        setDestinazioneSelected(NUM_DEST)
                                    }}
                                />
                            )}
                        />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h4" fontStyle="italic">
                    3. <DescriptionTwoToneIcon />
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Box sx={{ ...commonStyles, borderColor: 'primary.main' }}>
                    <Stack direction="column" textAlign="start">
                        <Typography fontStyle="italic" variant="h6">
                            Altro da segnalare?
                        </Typography>
                        <TextField
                            disabled={destinazioneSelected == NO_DESTINAZIONE || dateTimeSelected == null}
                            inputProps={{ maxLength: 255 }}
                            sx={{ mt: 2 }}
                            value={noteStampa}
                            onChange={(e) => setNoteStampa(e.target.value)}
                            autoFocus
                            label="Se vuoi puoi aggiungere una nota oppure confermare per prosegure senza"
                            type="text"
                            multiline
                            fullWidth
                            variant="outlined"
                            rows={4}
                        />
                        <Button
                            sx={{ mt: 3, height: 60 }}
                            size="large"
                            fullWidth
                            disabled={
                                destinazioneSelected == NO_DESTINAZIONE ||
                                dateTimeSelected == null ||
                                tempoConsegnaSelected == null
                            }
                            variant="contained"
                            onClick={handleClose}
                            endIcon={<SendTwoToneIcon />}
                        >
                            INVIA ORDINE
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}
