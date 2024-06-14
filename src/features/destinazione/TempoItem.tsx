import { Card, CardContent, Grid, Stack, Typography, styled } from '@mui/material'
import 'moment/locale/it'
import { TempoConsegnaItem } from '../ricerca/ricercaSlice'

export enum TempoConsegna {
    MATTINA = 'MATTINA',
    PRANZO = 'POMERIGGIO',
    EMERGENZE = 'EMERGENZE',
}

interface DestinazioneItemProps {
    isDisabled: boolean
    item: TempoConsegnaItem
    TEMPO_SELECTED: TempoConsegna | null
    setValue: (value: TempoConsegna) => any
}

const CardNoPadding = styled(Card)(({ theme }) => ({
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
    padding: 0,
    width: '100%',
    '&:last-child': {
        paddingBottom: 0,
    },
}))

const CardNoPaddingNoRadius = styled(Card)(({ theme }) => ({
    borderColor: 'transparent',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
    padding: 0,
    width: '100%',
    '&:last-child': {
        paddingBottom: 0,
    },
}))

const CardContentNoPaddingNoRadius = styled(CardContent)(({ theme }) => ({
    padding: 0,
    width: '100%',
    '&:last-child': {
        paddingBottom: 0,
    },
}))

export function TempoItem({ isDisabled, item, TEMPO_SELECTED, setValue }: DestinazioneItemProps) {
    const TipoWrapper = item.value == TEMPO_SELECTED ? CardNoPadding : CardNoPaddingNoRadius

    return (
        <TipoWrapper
            elevation={6}
            sx={(theme) => ({
                marginTop: 1,
                opacity: isDisabled ? 0.3 : 1,
            })}
        >
            <CardContentNoPaddingNoRadius
                onClick={() => {
                    if (isDisabled == false) {
                        setValue(item.value)
                    }
                }}
            >
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Grid container direction="column" padding={0.5}>
                            <Grid item xs={12} sm={6}>
                                <Stack direction="row" alignItems="center" gap={0.5}>
                                    <Typography variant="h4">{item.icon}</Typography>
                                    <Typography variant="h6" sx={{ fontStyle: 'oblique' }}>
                                        {item.label}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            padding={0.4}
                            spacing={0.4}
                        />
                    </Grid>
                </Grid>
            </CardContentNoPaddingNoRadius>
        </TipoWrapper>
    )
}
