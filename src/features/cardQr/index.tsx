import { Grid } from '@mui/material'
import React from 'react'
import qr from './qr.svg'
import { Typography } from '@mui/material'

const CardQr: React.FC = () => {
    return (
        <Grid container alignContent="center" justifyContent="center" direction="column">
            <Grid item sx={{ backgroundColor: 'white' }}>
                <img
                    src={qr}
                    alt="Card Image"
                    style={{
                        maxWidth: 150,
                        maxHeight: 150,
                    }}
                />
                <Typography>87542334</Typography>
            </Grid>
        </Grid>
    )
}

export default CardQr
