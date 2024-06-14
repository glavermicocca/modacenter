import { Box, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'
import Avatar from '@mui/material/Avatar'
import * as React from 'react'
import { useGetCategorieQuery } from './ricercaAPI'
import { CatMerceObj } from './ricercaSlice'
import { styled } from '@mui/material/styles'

interface Props {
    onFilter: (catMerce: string[]) => void
}
export default function CategorieMultiSelect({ onFilter }: Props) {
    const { data, isLoading } = useGetCategorieQuery()

    const [catMerce, setCatMerce] = React.useState<string[]>([])

    const handleFormat = (event: React.MouseEvent<HTMLElement>, catMerce: string[]) => {
        setCatMerce(catMerce)
        onFilter(catMerce)
    }

    const theme = useTheme()

    const ToggleButton = styled(MuiToggleButton)(({ color }: any) => ({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
    }))

    return (
        <Box mt={1} style={{ overflowX: 'scroll', width: '100%' }}>
            <ToggleButtonGroup value={catMerce} onChange={handleFormat}>
                {data?.data?.map((value: CatMerceObj) => {
                    return (
                        <ToggleButton key={value.COD_CAT} style={{ flexWrap: 'wrap' }} value={value.COD_CAT}>
                            <Avatar sx={{ mr: 1 }}>{value.icon}</Avatar>
                            {value.DES_CAT}
                        </ToggleButton>
                    )
                })}
            </ToggleButtonGroup>
        </Box>
    )
}
