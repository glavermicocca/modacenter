import {
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Pagination,
    Stack,
} from '@mui/material'
import 'moment/locale/it'
import { useState } from 'react'

import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone'
import React from 'react'
import { GenericListItems, GenericQueryPagination } from '../../components/GenericListItem'
import { ArtAnaItem } from './ArtAnaItem'
import CategorieMultiSelect from './CategorieMultiSelect'
import ToggleButtonStoricoListini from './ToggleButtonStoricoListini'
import { useGetRicercaArtAnaQuery } from './ricercaAPI'
import { ArtAna } from './ricercaSlice'

interface RicercaProps {}

const ArtAnaList = GenericListItems<ArtAna>()

export function Ricerca({}: RicercaProps) {
    const PAGE_SIZE = 20

    const defaultDataSearch: GenericQueryPagination = {
        search: '',
        pageSize: PAGE_SIZE,
        page: 0,
        history: false,
        listino: false,
        filter: null,
    }

    const [dataSearch, setDataSearch] = useState<GenericQueryPagination>(defaultDataSearch)

    // PAGINATION

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataSearch((prevData) => {
            return { ...prevData, page: value }
        })
        const anchor = document.querySelector('#back-to-top-anchor')
        anchor?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const { data, isLoading } = useGetRicercaArtAnaQuery({
        page: dataSearch.page <= 0 ? 0 : dataSearch.page - 1,
        pageSize: PAGE_SIZE,
        search: dataSearch.search,
        history: dataSearch.history,
        filter: dataSearch.filter,
        listino: dataSearch.listino,
    })

    // DESIGN

    return (
        <>
            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={{ minWidth: '100%' }}>
                <ToggleButtonStoricoListini
                    count={dataSearch.filter?.length}
                    onChangeFilter={(data: string) => {
                        console.log(data)
                        switch (data) {
                            case 'filter':
                                setDataSearch((prevData) => {
                                    return { ...prevData, filter: [], page: 0 }
                                })
                                break

                            default:
                                setDataSearch((prevData) => {
                                    return { ...prevData, filter: null, page: 0 }
                                })
                                break
                        }
                    }}
                    onChangeHistoryListino={(data: string) => {
                        switch (data) {
                            case 'history':
                                setDataSearch((prevData) => {
                                    return { ...prevData, history: true, listino: false, page: 0 }
                                })
                                break
                            case 'listino':
                                setDataSearch((prevData) => {
                                    return { ...prevData, history: false, listino: true, page: 0 }
                                })
                                break
                            default:
                                setDataSearch((prevData) => {
                                    return { ...prevData, history: false, listino: false, page: 0 }
                                })
                                break
                        }
                    }}
                />
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-ricerca-libera">Ricerca libera</InputLabel>
                    <OutlinedInput
                        size="medium"
                        id="outlined-adornment-ricerca-libera"
                        endAdornment={
                            <InputAdornment position="end">
                                {isLoading && <CircularProgress variant="indeterminate" size="1rem" />}
                                <IconButton
                                    color="primary"
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
                                    listino: prevData.listino,
                                    history: prevData.history,
                                    filter: prevData.filter,
                                    search: e.target.value,
                                }
                            })
                        }}
                        value={dataSearch.search}
                    />
                </FormControl>
            </Stack>
            {dataSearch.filter !== null && (
                <CategorieMultiSelect
                    onFilter={(catMerce) => {
                        setDataSearch((prevData) => {
                            return { ...prevData, filter: catMerce, page: 0 }
                        })
                    }}
                />
            )}
            {data !== null && (
                <ArtAnaList
                    isLoading={isLoading}
                    data={data.data}
                    render={(artAna) => (
                        <ArtAnaItem
                            history={dataSearch.history}
                            artUmList={artAna.artUmList}
                            carrelloAppoggio={artAna.carrelloAppoggio}
                            listini={data.listini}
                            key={artAna.COD_ART}
                            _COD_ART={artAna.COD_ART}
                            _DES_RIGA={artAna.DES_ART}
                            _DES_CAT={artAna.DES_CAT}
                            _UM_BASE={artAna.UM_BASE}
                            _PREZZO_LISTINO={artAna.PREZZO_LISTINO}
                            _COD_LIST={artAna.COD_LIST}
                            _DEFAULT_COD_LIST={artAna.DEFAULT_COD_LIST}
                            _WEB_DISABILITATO={artAna.WEB_DISABILITATO}
                            _WEB_NOTA_1={artAna.WEB_NOTA_1}
                            _WEB_NOTA_2={artAna.WEB_NOTA_2}
                            _WEB_NOTA_3={artAna.WEB_NOTA_3}
                        />
                    )}
                />
            )}
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
