import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { ReactElement, useCallback, useState } from 'react'

interface PropsNumericPad {
    label?: string
    apice1?: string | number
    apice2?: string | number
    pedice?: string
    currentValue?: number | null
    callbackValueChanged: (value: number) => void
    callbackIsValid: (value: number) => void
    highlightButton?: Boolean
    auxDown?: ReactElement
    auxUpper?: ReactElement
}

export const NumericPad = ({
    label,
    apice1,
    apice2,
    pedice,
    currentValue,
    callbackValueChanged,
    callbackIsValid,
    highlightButton,
    auxDown,
    auxUpper,
}: PropsNumericPad) => {
    const [value, setValue] = useState<string>('')
    const [isValid, setIsValid] = useState(true)

    const handleClick = useCallback(
        (event: any) => {
            const text = event.target.textContent

            if (value != null) {
                switch (text) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        setValue((v) => {
                            if (v == '0') {
                                v = ''
                            }
                            const newVal = v + text
                            if (!newVal.match(/^[+-]?\d+(\.\d+)?$/)) {
                                setIsValid(false)
                                return v
                            }
                            setIsValid(true)
                            callbackIsValid(Number(newVal))
                            return newVal
                        })
                        break
                    case '.':
                        setValue((v) => {
                            setIsValid(false)
                            const newVal = v + text
                            if (newVal.split('.').length > 2) {
                                return v
                            }
                            return newVal
                        })
                        break
                    case 'Conferma':
                        if (value != '') {
                            callbackValueChanged(Number(value))
                        }
                        break
                    case 'del':
                        setValue((v) => {
                            const newVal = v!.length > 0 ? v!.substring(0, v!.length - 1) : ''
                            if (!newVal.match(/^[+-]?\d+(\.\d+)?$/)) {
                                setIsValid(false)
                                return newVal
                            }
                            setIsValid(true)
                            callbackIsValid(Number(newVal))
                            return newVal
                        })
                        break
                }
            }
        },
        [value]
    )

    const color = highlightButton ? 'secondary' : 'primary'

    return (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={1}>
            <Grid container spacing={1} sx={{ maxWidth: 400 }}>
                {auxUpper != null && (
                    <Grid item xs={4}>
                        {auxUpper}
                    </Grid>
                )}
                <Grid item xs={auxDown != null ? 8 : 12}>
                    <Stack direction="row" spacing={0} justifyContent="flex-end">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="textSecondary">
                                    {label}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box component="div" sx={{ display: 'inline' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {apice1} {apice2}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography variant="h3" color={isValid ? 'textPrimary' : 'error'}>
                            <b>{value || currentValue}</b>
                        </Typography>
                        <Typography variant="body2" alignItems="baseline">
                            {pedice}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        7
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        8
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        9
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        4
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        5
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        6
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        1
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        2
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        3
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        .
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        0
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button sx={{ fontSize: '28px' }} fullWidth variant="contained" color={color} onClick={handleClick}>
                        del
                    </Button>
                </Grid>
                {auxDown != null && (
                    <Grid item xs={5}>
                        {auxDown}
                    </Grid>
                )}
                <Grid item xs={auxDown != null ? 7 : 12}>
                    <Button
                        sx={{ fontSize: '28px' }}
                        disabled={!isValid || value == ''}
                        fullWidth
                        variant="contained"
                        color={color}
                        onClick={handleClick}
                    >
                        Conferma
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
