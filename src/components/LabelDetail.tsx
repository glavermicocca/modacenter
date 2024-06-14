import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

export interface LabelValue {
    value: string | number | undefined
    label: string
}
export interface Props {
    labelTitle?: string | null
    label?: string | null
    list?: Array<LabelValue>
}

export const LabelDetail = ({ labelTitle, label }: Props) => {
    return (
        <>
            {label !== null && label.length > 0 && (
                <>
                    <Stack spacing={0.5} margin={0.5}>
                        <Typography sx={{ fontSize: 9 }} variant="caption" color="textSecondary">
                            {labelTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {label}
                        </Typography>
                    </Stack>
                </>
            )}
        </>
    )
}

export const LabelDetailList = ({ labelTitle, list }: Props) => (
    <Box sx={{ width: '100%' }} textAlign="center">
        {labelTitle !== null && (
            <Typography sx={{ fontSize: 9, width: '10%' }} variant="caption" color="textSecondary">
                {labelTitle}
            </Typography>
        )}
        <Grid
            spacing={{ xs: 0, sm: 1 }}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="baseline"
            textAlign="left"
        >
            {list?.map((it: LabelValue) => (
                <React.Fragment key={it.label}>
                    <Grid item xs={12} sm={2}>
                        <Typography sx={{ fontSize: 9 }} variant="caption" color="textSecondary">
                            {it.label}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Typography variant="body2">{it.value !== null ? it.value : '-'}</Typography>
                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    </Box>
)
