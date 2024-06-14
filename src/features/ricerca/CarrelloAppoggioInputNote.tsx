import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { useState } from 'react'
import { useInsertUpdateCarrelloAppoggioMutation } from './ricercaAPI'
import { CarrelloAppoggioObj } from './ricercaSlice'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'

export interface Props {
    carrelloItem?: CarrelloAppoggioObj
}

const CarrelloAppoggioInputNote = ({ carrelloItem }: Props) => {
    const [
        insert, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useInsertUpdateCarrelloAppoggioMutation()

    const [value, setValue] = useState<string>(carrelloItem?.NOTE || '')

    const handleClick = () => {
        if (editText == true && carrelloItem !== null) {
            setEditText(false)
            insert({
                DES_RIGA: carrelloItem.DES_RIGA,
                COD_ART: carrelloItem.COD_ART,
                COD_LIST: carrelloItem.COD_LIST,
                // DATI CALCOLATI
                UM: carrelloItem.UM,
                NUM_UM: carrelloItem.NUM_UM,
                UM_CONFEZIONE: carrelloItem.UM_CONFEZIONE,
                NUMERO_CONFEZIONI: carrelloItem.NUMERO_CONFEZIONI,
                CONT_1_CONFEZIONE: carrelloItem.CONT_1_CONFEZIONE,
                QUANT_RIGA: carrelloItem.QUANT_RIGA,
                NOTE: value,
                UM_BASE: carrelloItem.UM_BASE,
                CONVERS_UM_BASE: carrelloItem.CONVERS_UM_BASE,
                QUANT_UM_BASE: carrelloItem.QUANT_UM_BASE,
                SOLO_MULTIPLI_CONFEZIONE: carrelloItem.SOLO_MULTIPLI_CONFEZIONE,
            })
        } else {
            setEditText(true)
        }
    }

    const [editText, setEditText] = useState<boolean>(false)

    // const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };

    const handleClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleClick()
    }

    return (
        <FormControl fullWidth>
            <Input
                value={value}
                onKeyDown={(event) => {
                    if (event.key == 'Enter') {
                        handleClick()
                    }
                }}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
                inputRef={(input) => input && input.focus()}
                onBlur={() => {
                    handleClick()
                }}
                disabled={!editText}
                fullWidth
                type="text"
                inputProps={{ maxLength: 2000 }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickEdit}
                            //onMouseDown={handleMouseDown}
                            edge="end"
                        >
                            {editText == true ? <CheckCircleTwoToneIcon /> : <EditTwoToneIcon />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default CarrelloAppoggioInputNote
