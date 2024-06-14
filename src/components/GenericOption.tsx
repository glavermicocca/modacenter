import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'

export interface SelectOption {
    key: String | Number
    value: String
}

export interface ListPropsWithLabel {
    label: String
    data: Array<SelectOption> | undefined
    handleSelected: (item: SelectOption) => void
    defaultKeySelectedByKey?: number | undefined
}

export function GenericOption({ data, label, handleSelected, defaultKeySelectedByKey }: ListPropsWithLabel) {
    const [age, setAge] = React.useState<number>(defaultKeySelectedByKey || 0)

    const handleChange = (event: SelectChangeEvent) => {
        setAge(Number(event.target.value))
        // const selectOptionArtUm: Array<SelectOption> = data?.find((it) => {
        //     it.key === event.target.value
        // }) || []
        // handleSelected(selectOptionArtUm[0].key)
    }

    return data != null && data.length > 0 ? (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    autoWidth
                    label={label}
                    labelId="demo-simple-select-label"
                    value={age.toString()}
                    onChange={handleChange}
                >
                    {data.map((item: SelectOption) => {
                        return (
                            <MenuItem key={item.key.toString()} value={item.key.toString()}>
                                {item.value}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    ) : (
        <Typography>{label} non ha valori...</Typography>
    )
}
