import { Grid } from '@mui/material'
import React from 'react'
import qr from './qr.svg'
import { Typography } from '@mui/material'
import { Container, Box } from '@mui/material'

const CardQr: React.FC = () => {
    return (
        <>
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
                </Grid>
                <Grid item></Grid>
            </Grid>

            <Container>
                <Box mb={2}>
                    <Typography variant="h6" component="h2">
                        Nome:
                    </Typography>
                    <Typography variant="body1">Mario</Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" component="h2">
                        Cognome:
                    </Typography>
                    <Typography variant="body1">Rossi</Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" component="h2">
                        Data di Nascita:
                    </Typography>
                    <Typography variant="body1">01/01/1980</Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" component="h2">
                        Carta di Credito:
                    </Typography>
                    <Typography variant="body1">1234 5678 9012 3456</Typography>
                </Box>
            </Container>
        </>
    )
}

export default CardQr
