import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import 'moment/locale/it'
import { useRef, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone'
import { GenericDialog } from '../../components/GenericDialog'
import { GenericQueryPagination } from '../../components/GenericListItem'
import { useInsertImageMutation } from '../ricerca/ricercaAPI'
import { ArtAna } from '../ricerca/ricercaSlice'
import ImagesUnsplashSlider from './ImagesUnsplashSlider'
import { useGetRicercaQuery, useLazyGetRicercaQuery } from './imagesUnsplashAPI'
import { ImageItemResponse } from './imagesUnsplashSlice'

const ODD_OPACITY = 0.2

interface ImagesUnsplashProps {
    artAna: ArtAna
}

export function ImagesUnsplash({ artAna }: ImagesUnsplashProps) {
    const PAGE_SIZE = 12 // Math.round((windowSize.current[1] * 0.6) / ROW_HEIGHT)

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

    const [upload] = useInsertImageMutation()

    const [queryUnsplash] = useLazyGetRicercaQuery()

    const [data, setData] = useState<ImageItemResponse | null>()

    const fetchData = async (query: string) => {
        if (query == null || query == '') return

        try {
            const response = await queryUnsplash({
                page: 1,
                search: query,
            }).unwrap()

            setData(response)
            // Handle the response data here
        } catch (error) {
            // Handle the error here
        }
    }

    const [openUnsplash, setOpenUnsplash] = useState<boolean>(false)

    // DESIGN

    return (
        <>
            <Button
                onClick={() => {
                    setOpenUnsplash((prev) => !prev)
                }}
                variant="contained"
            >
                UnSplash
            </Button>
            <GenericDialog
                noTxt="Chiudi"
                isOpen={openUnsplash}
                title="Cancella immagine"
                content={
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-ricerca-unsplash">Ricerca libera</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-ricerca-unsplash"
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
                                fetchData(e.target.value)
                            }}
                            value={dataSearch.search}
                        />
                        <Grid
                            container
                            spacing={1}
                            sx={{ mt: 2 }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                        >
                            {data?.dataImages !== null && (
                                <ImagesUnsplashSlider
                                    setImage={(image) => {
                                        try {
                                            const resu = upload({
                                                COD_ART: artAna.COD_ART,
                                                ART_IMAGE: image,
                                            }).unwrap()
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }}
                                    images={data?.dataImages}
                                />
                            )}
                        </Grid>
                        {/* <Stack alignItems={'center'} spacing={2} sx={{ marginTop: 2 }}>
                    <Pagination
                        count={data == null ? 0 : Math.round(data.rowCount / PAGE_SIZE)+1}
                        page={dataSearch.page}
                        onChange={handleChange}
                    />
                </Stack> */}
                    </FormControl>
                }
                onConfirm={async function () {
                    setOpenUnsplash((prev) => !prev)
                }}
                onCancel={function (): void {
                    setOpenUnsplash((prev) => !prev)
                }}
            />
        </>
    )
}
