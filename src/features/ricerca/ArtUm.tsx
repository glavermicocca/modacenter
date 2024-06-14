import GrainTwoToneIcon from '@mui/icons-material/GrainTwoTone'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import ScaleTwoToneIcon from '@mui/icons-material/ScaleTwoTone'
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { ArtUmObj } from './ricercaSlice'

export enum UNITA_DI_MISURA {
    CASSA = 'CASSA',
    KG = 'KG',
    PEZZI = 'PEZZI',
}

export interface Props {
    handleClick: (e: SyntheticEvent) => void
    artUm?: Array<ArtUmObj>
}
const ArtUm = ({ handleClick, artUm }: Props) => {
    const defValue: number | null = artUm?.find((art) => art.isDefault == true)?.NUM_UM || 0

    const [value, setValue] = useState<number | null>(defValue)

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newValue: number | null) => {
        setValue(newValue)
    }

    const intCassa: number = artUm?.find((it) => it.UM == UNITA_DI_MISURA.CASSA)?.NUM_UM || 0
    const intKg: number = artUm?.find((it) => it.UM == UNITA_DI_MISURA.KG)?.NUM_UM || 0
    const intPezzi: number = artUm?.find((it) => it.UM == UNITA_DI_MISURA.PEZZI)?.NUM_UM || 0

    const matchesVH = useMediaQuery((theme: any) => theme.breakpoints.only('xs')) == true ? 'vertical' : 'horizontal'

    return (
        <ToggleButtonGroup orientation={matchesVH} color="primary" value={value} exclusive onChange={handleAlignment} size="medium">
            <ToggleButton value={intCassa}>
                <Inventory2TwoToneIcon /> {UNITA_DI_MISURA.CASSA}
            </ToggleButton>
            <ToggleButton value={intKg}>
                <ScaleTwoToneIcon /> {UNITA_DI_MISURA.KG}
            </ToggleButton>
            <ToggleButton value={intPezzi}>
                <GrainTwoToneIcon /> {UNITA_DI_MISURA.PEZZI}
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ArtUm
