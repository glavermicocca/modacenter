import { Badge, Button, Stack, Typography, useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MuiToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'
import { styled } from '@mui/material/styles'
import moment from 'moment'
import 'moment/locale/it'
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCfQuery } from './ricercaAPI'
import { CfNewObj } from './ricercaSlice'
import download from './svg/download.svg'
import filter from './svg/filter.svg'
import heart from './svg/heart.svg'
import inviati from './svg/inviati.svg'
import listino from './svg/listino.svg'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius: theme.shape.borderRadius,
        [`&.${toggleButtonGroupClasses.disabled}`]: {
            border: 0,
        },
    },
    //   [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    //     {
    //       marginLeft: -1,
    //       borderLeft: '1px solid transparent',
    //     },
}))

export interface Props {
    count: number | undefined
    onChangeHistoryListino: (data: string) => void
    onChangeFilter: (data: string) => void
}

export default function ToggleButtonStoricoListini({ count, onChangeFilter, onChangeHistoryListino }: Props) {
    const [buttonsSelected, setButtonsSelected] = useState<string | null>(null)

    const handleChangeToggleButtons = (event: React.MouseEvent<HTMLElement>, newHistory: string) => {
        setButtonsSelected(newHistory)

        onChangeHistoryListino(newHistory)
    }

    const [filterSelected, setFilterSelected] = useState<string | null>(null)

    const handleFilter = (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
        console.log(newFilter)
        setFilterSelected(newFilter)

        onChangeFilter(newFilter)
    }

    const handleClickDownload = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_ENDPOINT + '/artAna/export', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const today = moment(new Date()).format('YYYYMMDD_HHmm')
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `listino_${today}.pdf`
                link.click()
                URL.revokeObjectURL(url)
            } else {
                console.error('Failed to download file')
            }
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }

    const theme = useTheme()

    const ToggleButton = styled(MuiToggleButton)(({ color }: any) => ({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
    }))

    const { data: cfData } = useGetCfQuery()

    const cf: CfNewObj | null = cfData !== null ? cfData?.data.cf : null

    const navigate = useNavigate()

    const handleClickGoToInviati = () => {
        navigate('/inviati')
    }

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    height: 70,
                }}
            >
                <Button variant="text" size="small" onClick={handleClickGoToInviati}>
                    <Stack direction="column" textAlign="center" alignItems="center">
                        <img src={inviati} alt="" style={{ width: 40 }} />
                        <Typography variant="caption">Inviati</Typography>
                    </Stack>
                </Button>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <StyledToggleButtonGroup value={buttonsSelected} exclusive onChange={handleChangeToggleButtons}>
                    <ToggleButton value="history" aria-label="left aligned">
                        <Stack direction="column" textAlign="center" alignItems="center">
                            <img src={heart} alt="" style={{ width: 40 }} />
                            <Typography variant="caption">preferiti</Typography>
                        </Stack>
                    </ToggleButton>
                    {cf?.cfCliUser.FLAG_WEB_LISTINO == 1 && (
                        <ToggleButton value="listino">
                            <Stack direction="column" textAlign="center" alignItems="center">
                                <img src={listino} alt="" style={{ width: 40 }} />
                                <Typography variant="caption">listino</Typography>
                            </Stack>
                        </ToggleButton>
                    )}
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <StyledToggleButtonGroup value={filterSelected} onChange={handleFilter} exclusive>
                    <ToggleButton value="filter" aria-label="centered">
                        <Badge color="secondary" badgeContent={count}>
                            <Stack direction="column" textAlign="center" alignItems="center">
                                <img src={filter} alt="" style={{ width: 40 }} />
                                <Typography variant="caption">filtro</Typography>
                            </Stack>
                        </Badge>
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
            {cf?.cfCliUser.FLAG_WEB_LISTINO == 1 && (
                <Button variant="outlined" size="small" onClick={handleClickDownload}>
                    <Stack direction="column" textAlign="center" alignItems="center">
                        <img src={download} alt="" style={{ width: 40 }} />
                        <Typography variant="caption">listino</Typography>
                    </Stack>
                </Button>
            )}
        </>
    )
}
