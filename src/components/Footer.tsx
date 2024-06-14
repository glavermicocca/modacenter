import { Box, Link } from '@mui/material'

export const Footer = () => {
    return (
        <Box sx={{ pt: 20 }} textAlign="center">
            <Link
                component="button"
                variant="body2"
                onClick={() => {
                    window.open('http://www.prosyt.it', '_blank')
                }}
            >
                www.prosyt.it
            </Link>
        </Box>
    )
}
