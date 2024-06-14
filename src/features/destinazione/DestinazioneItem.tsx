import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import { Card, CardContent, Grid, Stack, Typography, styled } from '@mui/material'
import 'moment/locale/it'
import { CfDestMerceObj } from '../ricerca/ricercaSlice'
import { useState } from 'react'
import TurnSlightRightTwoToneIcon from '@mui/icons-material/TurnSlightRightTwoTone'
import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone'

interface DestinazioneItemProps {
    isDisabled: boolean
    item: CfDestMerceObj
    NUM_DEST_SELECTED: number
    setNUM_DEST_SELECTED: (NUM_DEST: number) => any
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

export function DestinazioneItem({ isDisabled, item, NUM_DEST_SELECTED, setNUM_DEST_SELECTED }: DestinazioneItemProps) {
    const TipoWrapper = item.NUM_DEST == NUM_DEST_SELECTED ? CardNoPadding : CardNoPaddingNoRadius

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
                        setNUM_DEST_SELECTED(item.NUM_DEST)
                    }
                }}
            >
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Grid container direction="column" padding={0.5}>
                            <Grid item xs={12} sm={6}>
                                <Stack direction="row" alignItems="center" gap={0.5}>
                                    <AssistantDirectionTwoToneIcon color="primary" />
                                    <Typography variant="h5" sx={{ fontStyle: 'oblique' }}>
                                        {item.DES_DEST_MERCE}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} mt={2}>
                                <Stack direction="column" gap={1}>
                                    <Stack direction="row" gap={2}>
                                        <Typography>{item.INDI_DEST_MERCE}</Typography>
                                        <Typography>{item.CAP_DEST_MERCE}</Typography>
                                    </Stack>
                                    <Stack direction="row" gap={2}>
                                        <Typography>{item.COMUNE_DEST_MERCE}</Typography>
                                        <Typography>{item.PROVINCIA_DEST_MERCE}</Typography>
                                    </Stack>
                                    <Stack direction="row" gap={2}>
                                        <Typography>{item.STATO_DEST_MERCE}</Typography>
                                        <Typography>{item.TEL_DEST_MERCE}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}></Stack>
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
