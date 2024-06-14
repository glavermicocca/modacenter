import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EuroSymbolTwoToneIcon from '@mui/icons-material/EuroSymbolTwoTone'
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import { Card, CardContent, Grid, Paper, Stack, Typography, styled } from '@mui/material'
import 'moment/locale/it'
import { ArtUmObj, CarrelloAppoggioObj, ListiniGPO, TIPO_IMAGE } from '../ricerca/ricercaSlice'
import ImageSlider from '../uploadImages/ImageSlider'
import CarrelloAppoggioHistory from './CarrelloAppoggioHistory'
import CarrelloAppoggioInputNote from './CarrelloAppoggioInputNote'
import CarrelloAppoggioQta from './CarrelloAppoggioQta'
import { useDeleteRigaOrdineMutation, useGetCarrelloAppoggioQuery, useGetListImagesQuery } from './ricercaAPI'

export enum TipoArtAna {
    DEFAULT = 'DEFAULT',
    LISTINO = 'LISTINO',
    OFFERTE = 'OFFERTE',
}

interface ArtAnaItemProps {
    _DES_RIGA?: string
    _DES_CAT?: string
    _COD_ART: string
    _UM_BASE?: string
    _PREZZO_LISTINO?: string
    _COD_LIST: string
    _DEFAULT_COD_LIST?: string
    // USER
    _WEB_DISABILITATO?: number
    _WEB_NOTA_1?: string
    _WEB_NOTA_2?: string
    _WEB_NOTA_3?: string
    //
    artUmList?: Array<ArtUmObj>
    carrelloAppoggio?: CarrelloAppoggioObj
    history?: Boolean
    listini: ListiniGPO
}

const CardNoPadding = styled(Card)(({ theme }) => ({
    borderColor: theme.palette.primary.main,
    background: `linear-gradient(to top right, transparent 94%, ${theme.palette.primary.main} 100%)`,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 0,
    width: '100%',
    '&:last-child': {
        paddingBottom: 0,
    },
}))

const CardNoPaddingNoRadius = styled(Card)(({ theme }) => ({
    borderColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 0,
    width: '100%',
    '&:last-child': {
        paddingBottom: 0,
    },
}))

const CardContentNoPaddingNoRadius = styled(CardContent)(({ theme }) => ({
    padding: 0,
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    '&:last-child': {
        paddingBottom: 0,
    },
}))

export function ArtAnaItem({
    _COD_ART,
    _DES_RIGA,
    _DES_CAT,
    _UM_BASE,
    _PREZZO_LISTINO,
    _COD_LIST,
    _DEFAULT_COD_LIST,
    // USER
    _WEB_DISABILITATO,
    _WEB_NOTA_1,
    _WEB_NOTA_2,
    _WEB_NOTA_3,
    artUmList,
    carrelloAppoggio, // prende la vendita più recente per proporre la data in HISTORY
    history,
    listini,
}: ArtAnaItemProps) {
    const [deleteRigaOrdine] = useDeleteRigaOrdineMutation()

    const handleDeleteRigaOrine = () => {
        try {
            const result = deleteRigaOrdine({
                COD_ART: _COD_ART,
                COD_LIST: _COD_LIST,
            }).unwrap()
        } catch (error) {
            console.error(error)
        }
    }

    const { data: dataCarrello } = useGetCarrelloAppoggioQuery()

    // JOIN CARRELLO APPOGGIO

    const carrelloItem = dataCarrello?.data.find((it) => it.COD_ART == _COD_ART && it.COD_LIST == _COD_LIST) // dati provenienti dalla query del carrello (tutto il carrello)

    let NUM_UM = carrelloItem?.NUM_UM

    let newArtUm: ArtUmObj | undefined = artUmList?.find((it) => it.NUM_UM == NUM_UM)

    const { data: dataImage } = useGetListImagesQuery({
        id: _COD_ART!!,
        TIPO: TIPO_IMAGE.ART_ANA,
    })

    const TipoWrapper = carrelloItem == null || carrelloItem?.QUANT_RIGA == 0 ? CardNoPaddingNoRadius : CardNoPadding

    let DES_RIGA = [_DES_RIGA]
    let icon = null

    let tipoArtAna = TipoArtAna.DEFAULT
    let isNota123 = true

    // non è nessun tipo di listino
    if (_COD_LIST == _DEFAULT_COD_LIST) {
        isNota123 = false
        tipoArtAna = TipoArtAna.DEFAULT
        if (_WEB_NOTA_1 !== null) {
            DES_RIGA.push(_WEB_NOTA_1)
        }
        if (_WEB_NOTA_2 !== null) {
            DES_RIGA.push(_WEB_NOTA_2)
        }
    } else if (listini.listiniPersonalizzati !== null && listini.listiniPersonalizzati.COD_LIST == _COD_LIST) {
        tipoArtAna = TipoArtAna.LISTINO
        icon = <ReceiptLongTwoToneIcon color="primary" />
        if (_WEB_NOTA_1 !== null) {
            DES_RIGA.push(_WEB_NOTA_1)
            isNota123 = false
        }
        if (_WEB_NOTA_2 !== null) {
            DES_RIGA.push(_WEB_NOTA_2)
            isNota123 = false
        }
    } else if (listini.listiniGruppo !== null && listini.listiniGruppo.COD_LIST == _COD_LIST) {
        tipoArtAna = TipoArtAna.LISTINO
        icon = <ReceiptLongTwoToneIcon color="primary" />
        if (_WEB_NOTA_1 !== null) {
            DES_RIGA.push(_WEB_NOTA_1)
            isNota123 = false
        }
        if (_WEB_NOTA_2 !== null) {
            DES_RIGA.push(_WEB_NOTA_2)
            isNota123 = false
        }
    } else if (listini.listiniOfferte !== null && listini.listiniOfferte.COD_LIST == _COD_LIST) {
        tipoArtAna = TipoArtAna.OFFERTE
        // è un listini offerte
        icon = <VerifiedTwoToneIcon color="primary" />
        if (_WEB_NOTA_3 !== null) {
            DES_RIGA.push(_WEB_NOTA_3)
            isNota123 = false
        }
    }

    if (isNota123 == true) {
        DES_RIGA.push(_COD_LIST)
    }

    return (
        <TipoWrapper
            elevation={5}
            sx={(theme) => ({
                mt: 1,
            })}
        >
            <CardContentNoPaddingNoRadius>
                <Stack direction="column" justifyContent="flex-end" gap={1}>
                    <Grid container direction="row">
                        {dataImage?.dataImages !== null && dataImage?.dataImages.length > 0 && (
                            <Grid item xs={3}>
                                <ImageSlider readonly data={dataImage.data} images={dataImage?.dataImages} />
                            </Grid>
                        )}
                        <Grid item xs={dataImage?.dataImages !== null && dataImage?.dataImages.length > 0 ? 9 : 12}>
                            <Grid container direction="column" paddingLeft={1} paddingRight={1}>
                                <Grid item xs={12} sm={6}>
                                    <Stack direction="row" alignItems="center" gap={1}>
                                        {icon}
                                        <Typography variant="h6" sx={{ fontStyle: 'oblique' }}>
                                            {DES_RIGA.join(' ')}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <FolderOpenTwoToneIcon fontSize="small" />
                                        <Typography variant="caption" color="text.secondary">
                                            {_DES_CAT}
                                        </Typography>
                                    </Stack>
                                    {_WEB_DISABILITATO !== 1 && (
                                        <Stack direction="row" alignItems="center" gap={1}>
                                            {carrelloItem?.QUANT_RIGA !== null && carrelloItem?.QUANT_RIGA > 0 ? (
                                                <CarrelloAppoggioInputNote carrelloItem={carrelloItem} />
                                            ) : (
                                                <hr style={{ margin: 0, width: '100%' }} />
                                            )}
                                            {_PREZZO_LISTINO !== null && (
                                                <>
                                                    <EuroSymbolTwoToneIcon />
                                                    <Typography variant="subtitle1" color="text.secondary">
                                                        {Number(_PREZZO_LISTINO).toFixed(2)}
                                                    </Typography>
                                                </>
                                            )}
                                            {carrelloAppoggio !== null &&
                                                carrelloAppoggio.artAna?.artListPrezzi !== null && (
                                                    <>
                                                        <EuroSymbolTwoToneIcon />
                                                        <Typography variant="subtitle1" color="text.secondary">
                                                            {Number(
                                                                carrelloAppoggio.artAna?.artListPrezzi.PREZZO_LISTINO
                                                            ).toFixed(2)}
                                                        </Typography>
                                                    </>
                                                )}
                                        </Stack>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {_WEB_DISABILITATO !== 1 ? (
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            padding={0.4}
                            spacing={0.4}
                        >
                            {history == true && (
                                <Grid item>
                                    <CarrelloAppoggioHistory carrelloAppoggio={carrelloAppoggio} />
                                </Grid>
                            )}
                            {carrelloItem && (
                                <Grid item>
                                    <Paper variant="outlined">
                                        <Stack
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            direction="row"
                                            gap={1}
                                            p={0.5}
                                        >
                                            <Stack direction="row" alignItems="baseline" gap={1} sx={{ height: 50 }}>
                                                <Typography variant="h3" sx={{ fontWeight: 'bold' }} color="primary">
                                                    {carrelloItem.QUANT_RIGA}
                                                </Typography>
                                            </Stack>
                                            <DeleteForeverTwoToneIcon color="primary" onClick={handleDeleteRigaOrine} />
                                        </Stack>
                                    </Paper>
                                </Grid>
                            )}
                            <CarrelloAppoggioQta
                                tipoArtAna={tipoArtAna}
                                artUmList={artUmList}
                                carrelloAppoggio={carrelloAppoggio}
                                _DES_RIGA={DES_RIGA.join(' ')}
                                _WEB_DISABILITATO={_WEB_DISABILITATO}
                                _COD_ART={_COD_ART}
                                _UM_BASE={_UM_BASE}
                                _COD_LIST={_COD_LIST}
                            />
                        </Grid>
                    ) : (
                        <Grid container direction="row" textAlign="center">
                            <Grid item xs={12}>
                                <Typography variant="h4" color="error">
                                    NON DISPONIBILE
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Stack>
            </CardContentNoPaddingNoRadius>
        </TipoWrapper>
    )
}
