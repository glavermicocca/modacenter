import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone'
import GrainTwoToneIcon from '@mui/icons-material/GrainTwoTone'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import ScaleTwoToneIcon from '@mui/icons-material/ScaleTwoTone'
import { Grid, Stack, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'
import { styled } from '@mui/material/styles'
import Big from 'big.js'
import React from 'react'
import { useGetCarrelloAppoggioQuery, useInsertUpdateCarrelloAppoggioMutation } from './ricercaAPI'
import { ArtUmObj, CarrelloAppoggioObj } from './ricercaSlice'
import { TipoArtAna } from './ArtAnaItem'

export interface Props {
    _DES_RIGA?: string
    _COD_ART: string
    _UM_BASE?: string
    _COD_LIST: string
    _WEB_DISABILITATO?: number
    artUmList?: Array<ArtUmObj>
    carrelloAppoggio?: CarrelloAppoggioObj
    tipoArtAna: TipoArtAna
}

export enum UNITA_DI_MISURA {
    CASSA = 'CASSA',
    KG = 'KG',
    PEZZI = 'PEZZI',
}

const CarrelloAppoggioQta = ({
    _COD_ART,
    _DES_RIGA,
    _UM_BASE,
    _COD_LIST,
    _WEB_DISABILITATO,
    artUmList,
    carrelloAppoggio,
    tipoArtAna,
}: Props) => {
    //const matchesVH = useMediaQuery((theme: any) => theme.breakpoints.only('xs')) == true ? 'vertical' : 'horizontal'

    const theme = useTheme()

    const ToggleButton = styled(MuiToggleButton)(({ color }: any) => ({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
    }))

    // INSERT UPDATE idS

    const handleUnitaDiMisura = (event: React.SyntheticEvent) => {
        switch (event.currentTarget.id) {
            // UNITA DI MISURA
            case UNITA_DI_MISURA.CASSA:
                NUM_UM = artUmList?.find((it) => it.DESC_UM == UNITA_DI_MISURA.CASSA)?.NUM_UM
                break
            case UNITA_DI_MISURA.KG:
                NUM_UM = artUmList?.find((it) => it.DESC_UM == UNITA_DI_MISURA.KG)?.NUM_UM
                break
            case UNITA_DI_MISURA.PEZZI:
                NUM_UM = artUmList?.find((it) => it.DESC_UM == UNITA_DI_MISURA.PEZZI)?.NUM_UM
                break
        }

        calcolaValori()

        insert({
            DES_RIGA: _DES_RIGA,
            COD_ART: _COD_ART,
            COD_LIST: _COD_LIST,
            // DATI CALCOLATI
            UM,
            NUM_UM,
            UM_CONFEZIONE,
            NUMERO_CONFEZIONI,
            CONT_1_CONFEZIONE,
            QUANT_RIGA,
            NOTE,
            UM_BASE,
            CONVERS_UM_BASE,
            QUANT_UM_BASE,
            SOLO_MULTIPLI_CONFEZIONE,
        })
    }

    // QUANTITA

    const [
        insert, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useInsertUpdateCarrelloAppoggioMutation()

    const { data: dataCarrello, isLoading: isLoadingCarrello } = useGetCarrelloAppoggioQuery()

    const carrelloItem = dataCarrello?.data.find((it) => it.COD_ART === _COD_ART && it.COD_LIST === _COD_LIST) // dati provenienti dalla query del carrello (tutto il carrello)

    let UM = carrelloItem?.UM || carrelloAppoggio?.UM || artUmList?.find((art) => art.isDefault == true)?.DESC_UM // DEFAULT IMPIANTO HG
    let NUM_UM =
        carrelloItem?.NUM_UM || carrelloAppoggio?.NUM_UM || artUmList?.find((art) => art.isDefault == true)?.NUM_UM // DEFAULT IMPIANTO HG

    let UM_CONFEZIONE = carrelloItem?.UM_CONFEZIONE
    let NUMERO_CONFEZIONI = carrelloItem?.NUMERO_CONFEZIONI
    let CONT_1_CONFEZIONE = carrelloItem?.CONT_1_CONFEZIONE
    let QUANT_RIGA = carrelloItem?.QUANT_RIGA || 0
    let NOTE = carrelloItem?.NOTE
    let UM_BASE = carrelloItem?.UM_BASE
    let CONVERS_UM_BASE = carrelloItem?.CONVERS_UM_BASE
    let QUANT_UM_BASE = carrelloItem?.QUANT_UM_BASE
    let SOLO_MULTIPLI_CONFEZIONE = carrelloItem?.SOLO_MULTIPLI_CONFEZIONE

    const calcolaValori = () => {
        const newArtUm = artUmList?.find((it) => it.NUM_UM == NUM_UM)

        UM = newArtUm?.UM
        UM_BASE = _UM_BASE
        CONVERS_UM_BASE = newArtUm?.CONVERS_UM
        let _m_QUANT_UM_BASE = Big(QUANT_RIGA).mul(newArtUm?.CONVERS_UM || 0)
        if (newArtUm?.ARROT_UM == 1) {
            if (newArtUm?.NUM_DEC_UM != null && newArtUm?.NUM_DEC_UM > 0) {
                _m_QUANT_UM_BASE = _m_QUANT_UM_BASE.round(newArtUm.NUM_DEC_UM, Big.roundHalfUp)
            }
        }
        QUANT_UM_BASE = _m_QUANT_UM_BASE.toNumber()
    }

    const handleQta = (event: React.SyntheticEvent) => {
        switch (event.currentTarget.id) {
            case 'plus':
                QUANT_RIGA = Big(QUANT_RIGA).add(1).toNumber()
                break
            case 'minus':
                if (QUANT_RIGA == 0) return
                QUANT_RIGA = Big(QUANT_RIGA).sub(1).toNumber()
                break
            case 'clear':
                QUANT_RIGA = Number(0)
                break
        }

        // forza unità di misura CASSA per gestione PROMOZIONI (soltanto)
        if (tipoArtAna == TipoArtAna.OFFERTE) {
            NUM_UM = artUmList?.find((it) => it.DESC_UM == UNITA_DI_MISURA.CASSA)?.NUM_UM
        }

        calcolaValori()

        insert({
            DES_RIGA: _DES_RIGA,
            COD_ART: _COD_ART,
            COD_LIST: _COD_LIST,
            // DATI CALCOLATI
            UM,
            NUM_UM,
            UM_CONFEZIONE,
            NUMERO_CONFEZIONI,
            CONT_1_CONFEZIONE,
            QUANT_RIGA,
            NOTE,
            UM_BASE,
            CONVERS_UM_BASE,
            QUANT_UM_BASE,
            SOLO_MULTIPLI_CONFEZIONE,
        })
    }

    if (artUmList?.length != 0) {
        return (
            <>
                <Grid item>
                    {tipoArtAna !== TipoArtAna.OFFERTE ? (
                        <ToggleButtonGroup sx={{ height: 60 }}>
                            <ToggleButton
                                id={UNITA_DI_MISURA.CASSA}
                                value={UNITA_DI_MISURA.CASSA}
                                selected={UM == UNITA_DI_MISURA.CASSA}
                                onClick={handleUnitaDiMisura}
                                sx={{ width: 60 }}
                            >
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ backgroundColor: 'primary' }}
                                >
                                    <Inventory2TwoToneIcon />
                                    {UNITA_DI_MISURA.CASSA}
                                </Stack>
                            </ToggleButton>
                            <ToggleButton
                                id={UNITA_DI_MISURA.KG}
                                value={UNITA_DI_MISURA.KG}
                                selected={UM == UNITA_DI_MISURA.KG}
                                onClick={handleUnitaDiMisura}
                                sx={{ width: 60 }}
                            >
                                <Stack direction="column" justifyContent="center" alignItems="center">
                                    <ScaleTwoToneIcon />
                                    {UNITA_DI_MISURA.KG}
                                </Stack>
                            </ToggleButton>
                            <ToggleButton
                                id={UNITA_DI_MISURA.PEZZI}
                                value={UNITA_DI_MISURA.PEZZI}
                                selected={UM == UNITA_DI_MISURA.PEZZI}
                                onClick={handleUnitaDiMisura}
                                sx={{ width: 60 }}
                            >
                                <Stack direction="column" justifyContent="center" alignItems="center">
                                    <GrainTwoToneIcon />
                                    {UNITA_DI_MISURA.PEZZI}
                                </Stack>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    ) : (
                        <ToggleButtonGroup sx={{ height: 60 }}>
                            <ToggleButton
                                id={UNITA_DI_MISURA.CASSA}
                                value={UNITA_DI_MISURA.CASSA}
                                selected={true}
                                onClick={handleUnitaDiMisura}
                                sx={{ width: 60 }}
                            >
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ backgroundColor: 'primary' }}
                                >
                                    <Inventory2TwoToneIcon />
                                    {UNITA_DI_MISURA.CASSA}
                                </Stack>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                </Grid>
                <Grid item>
                    <ToggleButtonGroup color="primary" sx={{ height: 60 }}>
                        <ToggleButton id="clear" value="+" onClick={handleQta} sx={{ width: 50 }}>
                            <BackspaceTwoToneIcon />
                        </ToggleButton>
                        <ToggleButton id="plus" value="+" onClick={handleQta} sx={{ width: 50 }}>
                            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                                +1
                            </Typography>
                        </ToggleButton>
                        <ToggleButton id="minus" value="+" onClick={handleQta} sx={{ width: 50 }}>
                            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                                -1
                            </Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </>
        )
    }

    return (
        <Grid item xs={12} sm="auto">
            <Typography variant="subtitle1" color="text.secondary">
                Att.ne nessuna unità di misura definita
            </Typography>
        </Grid>
    )
}

export default CarrelloAppoggioQta
