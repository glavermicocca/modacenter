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
    ToggleButtonGroup,
    ToggleButton,
    Badge,
} from '@mui/material'
import 'moment/locale/it'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone'
import { GenericListItems, GenericQueryPagination } from '../../components/GenericListItem'
import { useGetRicercaArtAnaQuery } from '../ricerca/ricercaAPI'
import { ArtAna } from '../ricerca/ricercaSlice'
import ImageItem from './ImageItem'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone'
import CategorieMultiSelect from '../ricerca/CategorieMultiSelect'

const ODD_OPACITY = 0.2

interface uploadImagesProps {
    gridColor: Color
}

const ArtAnaList = GenericListItems<ArtAna>()

export function Images({ gridColor }: uploadImagesProps) {
    const windowSize = useRef([window.innerWidth, window.innerHeight])

    const ROW_HEIGHT = 78

    const PAGE_SIZE = 12 // Math.round((windowSize.current[1] * 0.6) / ROW_HEIGHT)

    const navigate = useNavigate()

    const location = useLocation()

    const defaultDataSearch: GenericQueryPagination = {
        search: '',
        pageSize: PAGE_SIZE,
        page: 0,
        history: false,
        listino: false,
        filter: null,
    }

    const [dataSearch, setDataSearch] = useState<GenericQueryPagination>(defaultDataSearch)

    //dispatch(ricercaApi.util.invalidateTags(['carrelloList']))

    // PAGINATION

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataSearch((prevData) => {
            return { ...prevData, page: value }
        })
    }

    const { data, isLoading } = useGetRicercaArtAnaQuery({
        page: dataSearch.page <= 0 ? 0 : dataSearch.page - 1,
        pageSize: PAGE_SIZE,
        search: dataSearch.search,
        history: false,
        listino: false,
        filter: dataSearch.filter,
    })

    const [buttonsSelected, setButtonsSelected] = useState<Array<string> | null>(null)

    const [listFilterToggle, setListFilterToggle] = useState<boolean>(false)

    const handleChangeToggleButtons = (event: React.MouseEvent<HTMLElement>, newHistory: Array<string>) => {
        if (newHistory.indexOf('history') !=== -1) {
            setDataSearch((prevData) => {
                setButtonsSelected(newHistory)
                return { ...defaultDataSearch, history: true }
            })
        } else {
            setDataSearch((prevData) => {
                setButtonsSelected(newHistory)
                return { ...prevData, history: false }
            })
        }

        if (newHistory.indexOf('filter') !=== -1) {
            setListFilterToggle(true)
        } else {
            setListFilterToggle(false)
            setDataSearch((prevData) => {
                return { ...prevData, filter: null, page: 0 }
            })
        }
    }

    // DESIGN

    return (
        <>
            <Stack spacing={1} direction="row" sx={{ minWidth: '100%' }}>
                <ToggleButtonGroup value={buttonsSelected} color="primary" onChange={handleChangeToggleButtons}>
                    <ToggleButton value="filter">
                        <Badge color="secondary" badgeContent={dataSearch.filter?.length}>
                            <FilterAltTwoToneIcon />
                        </Badge>
                    </ToggleButton>
                </ToggleButtonGroup>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-ricerca-images">Ricerca libera</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-ricerca-images"
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
            {listFilterToggle === true && (
                <CategorieMultiSelect
                    onFilter={(catMerce) => {
                        setDataSearch((prevData) => {
                            return { ...prevData, filter: catMerce, page: 0 }
                        })
                    }}
                />
            )}
            <Grid
                container
                spacing={1}
                sx={{ mt: 2 }}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <ArtAnaList
                    isLoading={isLoading}
                    data={data?.data}
                    render={(artAna) => (
                        <Grid key={artAna.COD_ART} item xs={12} sm={6} md={4} lg={3}>
                            <ImageItem artAna={artAna} />
                        </Grid>
                    )}
                />
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
