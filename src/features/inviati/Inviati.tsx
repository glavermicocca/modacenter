import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone'
import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Color,
    Divider,
    Fab,
    Grid,
    Pagination,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import 'moment/locale/it'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GenericListItems, GenericQueryPagination } from '../../components/GenericListItem'
import { FormatDataDoc, FormatDataOraRichiesta } from '../fatta/Fatta'
import { useDuplicateCarrelloAppoggioMutation, useGetCarrelloTestataAppoggioQuery } from '../ricerca/ricercaAPI'
import { CarrelloTestataAppoggioObj } from '../ricerca/ricercaSlice'
import { Images } from './Images'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
const ODD_OPACITY = 0.2

interface Props {
    gridColor: Color
}

const AppReq3HypservList = GenericListItems<CarrelloTestataAppoggioObj>()

export function Inviati({ gridColor }: Props) {
    const PAGE_SIZE = 20

    const navigate = useNavigate()

    const defaultDataSearch: GenericQueryPagination = {
        search: '',
        pageSize: PAGE_SIZE,
        page: 0,
        filter: null,
        history: false,
        listino: false,
    }

    const [dataSearch, setDataSearch] = useState<GenericQueryPagination>(defaultDataSearch)

    // PAGINATION

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataSearch((prevData) => {
            return { ...prevData, page: value }
        })
    }

    const { data, isLoading } = useGetCarrelloTestataAppoggioQuery({
        page: dataSearch.page <= 0 ? 0 : dataSearch.page - 1,
        pageSize: PAGE_SIZE,
        filter: null,
        history: false,
        listino: false,
    })

    // DESIGN

    const [
        duplicate, // This is the mutation trigger
    ] = useDuplicateCarrelloAppoggioMutation()

    const handleClick = (cta: CarrelloTestataAppoggioObj) => {
        duplicate({
            RIF_CLI_NR: cta.RIF_CLI_NR,
        })
        navigate('/carrello')
    }

    const matchesVH = useMediaQuery((theme: any) => theme.breakpoints.only('xs')) == true ? 'none' : 'visible'

    // Aggiungi uno stato per tracciare l'Accordion aperto
    const [openAccordion, setOpenAccordion] = useState<string | null>(null)

    // Aggiungi una funzione per gestire il cambiamento dell'Accordion
    const handleAccordionChange = (RIF_CLI_NR: string) => {
        setOpenAccordion((prevAccordion) => (prevAccordion === RIF_CLI_NR ? null : RIF_CLI_NR))
    }

    return (
        <>
            <AppReq3HypservList
                isLoading={isLoading}
                data={data?.data}
                render={(carrelloTestataAppoggio) => {
                    return (
                        <Accordion
                            key={carrelloTestataAppoggio.RIF_CLI_NR}
                            sx={{ width: '100%', ml: 1, mr: 1 }}
                            elevation={5}
                            expanded={openAccordion === carrelloTestataAppoggio.RIF_CLI_NR}
                            onChange={(event: React.SyntheticEvent, expanded: boolean) => {
                                if (carrelloTestataAppoggio.RIF_CLI_NR != null) {
                                    handleAccordionChange(carrelloTestataAppoggio.RIF_CLI_NR)
                                }
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Grid container direction="column">
                                    <Grid item xs="auto">
                                        <Stack direction="row" spacing={2}>
                                            <Typography variant="button">
                                                {FormatDataDoc(carrelloTestataAppoggio)}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                (art.{' '}
                                                {carrelloTestataAppoggio != null &&
                                                    carrelloTestataAppoggio?.carrelloAppoggioList != null &&
                                                    (
                                                        carrelloTestataAppoggio?.carrelloAppoggioList?.length
                                                    ).toString()}
                                                )
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Stack direction="column">
                                            <Stack direction="row" gap={2} justifyContent="flex-end">
                                                <AssistantDirectionTwoToneIcon color="primary" />
                                                <Typography variant="body1" sx={{ fontStyle: 'oblique' }}>
                                                    {carrelloTestataAppoggio.DES_DEST_MERCE}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" gap={2} justifyContent="flex-end">
                                                <Typography align="right">
                                                    {carrelloTestataAppoggio.INDI_DEST_MERCE}
                                                </Typography>
                                                <Typography align="right">
                                                    {carrelloTestataAppoggio.CAP_DEST_MERCE}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" gap={2} justifyContent="flex-end">
                                                <Typography align="right">
                                                    {carrelloTestataAppoggio.COMUNE_DEST_MERCE}
                                                </Typography>
                                                <Typography align="right">
                                                    {carrelloTestataAppoggio.PROVINCIA_DEST_MERCE}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" gap={2} justifyContent="flex-end">
                                                <Typography align="right">
                                                    {carrelloTestataAppoggio.STATO_DEST_MERCE}
                                                </Typography>
                                                <Typography align="right">
                                                    {carrelloTestataAppoggio.TEL_DEST_MERCE}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container alignItems="center">
                                    <Grid item xs={12} textAlign="center" mb={1}>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="caption" style={{ fontStyle: 'italic' }}>
                                                Consegna :
                                            </Typography>
                                            <Typography textAlign="center" variant="body1">
                                                {FormatDataOraRichiesta(carrelloTestataAppoggio)}
                                            </Typography>
                                            <Typography variant="body1" textAlign="center">
                                                {carrelloTestataAppoggio.TEMPO_CONSEGNA}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="caption" style={{ fontStyle: 'italic' }}>
                                                Note:
                                            </Typography>
                                            <Typography textAlign="center" variant="body1">
                                                {carrelloTestataAppoggio.NOTE_STAMPA || '-'}
                                            </Typography>
                                        </Stack>
                                        <Divider sx={{ mb: 2 }} />
                                        <Button
                                            onClick={() => {
                                                handleClick(carrelloTestataAppoggio)
                                            }}
                                            variant="contained"
                                            endIcon={<AddShoppingCartTwoToneIcon />}
                                        >
                                            Utilizza questo carrello
                                        </Button>
                                    </Grid>
                                    {carrelloTestataAppoggio.carrelloAppoggioList?.map((item) => (
                                        <Box key={item.COD_ART + item.COD_LIST} sx={{ width: '100%' }}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                alignContent="center"
                                                wrap="nowrap"
                                                spacing={1}
                                            >
                                                <Grid item xs="auto">
                                                    <FolderOpenTwoToneIcon fontSize="small" />
                                                </Grid>
                                                <Grid item xs="auto">
                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.DES_CAT}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <div style={{ width: '100%' }}>
                                                        <Divider orientation="horizontal" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Stack direction="row">
                                                {<Images _COD_ART={item.COD_ART} matchesVH={matchesVH} />}
                                                <Grid container ml={2} justifyContent="space-between">
                                                    <Grid item xs={10}>
                                                        <Typography variant="body2">{item.DES_RIGA}</Typography>
                                                    </Grid>
                                                    {item.WEB_DISABILITATO != 1 ? (
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="right">
                                                                {item.QUANT_RIGA} {item.UM}
                                                            </Typography>
                                                        </Grid>
                                                    ) : (
                                                        <Grid item xs={2} textAlign="end">
                                                            <Typography variant="body1" color="error">
                                                                NON DISPONIBILE
                                                            </Typography>
                                                        </Grid>
                                                    )}
                                                    <Grid item xs={12}>
                                                        <Stack direction="row" spacing={1}>
                                                            <Typography
                                                                variant="caption"
                                                                style={{ fontStyle: 'italic' }}
                                                            >
                                                                Note di riga:
                                                            </Typography>
                                                            <Typography textAlign="center" variant="body1">
                                                                {item.NOTE || '-'}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )
                }}
            />
            <Stack alignItems={'center'} spacing={2} sx={{ marginTop: 2 }}>
                <Pagination
                    count={data == null ? 0 : Math.round(data.rowCount / PAGE_SIZE) + 1}
                    page={dataSearch.page}
                    onChange={handleChange}
                />
            </Stack>
            <Fab
                color="primary"
                aria-label="back"
                onClick={() => navigate(-1)}
                sx={{ position: 'fixed', left: '47%', right: '47%', bottom: 16 }}
            >
                <ArrowBackTwoToneIcon />
            </Fab>
        </>
    )
}
