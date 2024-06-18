import {
    Color,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Pagination,
    Stack,
    Typography,
} from '@mui/material'
import 'moment/locale/it'
import { useState } from 'react'

import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone'
import { GenericListItems, GenericQueryPagination } from '../../components/GenericListItem'
import { useGetListiniOfferteQuery } from '../ricerca/ricercaAPI'
import { ArtAna } from '../ricerca/ricercaSlice'

const ODD_OPACITY = 0.2

interface PromoProps {
    gridColor: Color
}

const ArtAnaList = GenericListItems<ArtAna>()

export function Offerte({ gridColor }: PromoProps) {
    const PAGE_SIZE = 20

    const defaultDataSearch: GenericQueryPagination = {
        search: '',
        pageSize: PAGE_SIZE,
        page: 0,
        filter: null,
        history: false,
        listino: false,
    }

    const [dataSearch, setDataSearch] = useState<GenericQueryPagination>(defaultDataSearch)

    //dispatch(ricercaApi.util.invalidateTags(['carrelloList']))

    // PAGINATION

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataSearch((prevData) => {
            return { ...prevData, page: value }
        })
    }

    const { data, isLoading } = useGetListiniOfferteQuery({
        page: dataSearch.page <= 0 ? 0 : dataSearch.page - 1,
        pageSize: PAGE_SIZE,
        search: dataSearch.search,
        filter: null,
        history: false,
        listino: false,
    })

    // DESIGN

    return (
        <>
            <Stack spacing={1} direction="row" sx={{ minWidth: '100%' }}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-ricerca-promo">Ricerca libera</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-ricerca-promo"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => {
                                        setDataSearch((prevData) => defaultDataSearch)
                                    }}
                                >
                                    <BackspaceTwoToneIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Ricerca libera"
                        onChange={(e) => {
                            setDataSearch((prevData) => {
                                return {
                                    ...defaultDataSearch,
                                    search: e.target.value,
                                }
                            })
                        }}
                        value={dataSearch.search}
                    />
                </FormControl>
            </Stack>
            <Grid container spacing={2} textAlign="center">
                <Grid item xs={12}>
                    <Typography fontStyle="italic" variant="h6">
                        {data?.listini.listiniPersonalizzati?.DES_TIPO_LIST}
                    </Typography>
                </Grid>
                {/* <Grid item xs={6}>
                        <Box textAlign="center">
                            <Paper variant="outlined">
                                <Typography fontStyle="italic" variant="h5">
                                    {GenericDateFormatShort(data?.listini?.DATA_INIZIO_VALIDITA)}
                                </Typography>
                                <Typography variant="caption">da ↗ </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box textAlign="center">
                            <Paper variant="outlined">
                                <Typography fontStyle="italic" variant="h5">
                                    {GenericDateFormatShort(data?.listini?.DATA_FINE_VALIDITA)}
                                </Typography>
                                <Typography variant="caption">da ↗ </Typography>
                            </Paper>
                        </Box>
                    </Grid> */}
            </Grid>
            <Stack alignItems={'center'} spacing={2} sx={{ marginTop: 2 }}>
                <Pagination
                    count={data == null ? 0 : Math.round(data.rowCount / PAGE_SIZE) + 1}
                    page={dataSearch.page}
                    onChange={handleChange}
                />
            </Stack>
        </>
    )
}
