import LockTwoToneIcon from '@mui/icons-material/LockTwoTone'
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResetPasswordMutation } from '../ricerca/ricercaAPI'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.prosyt.it/">
                Prosyt
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export function ResetPassword() {
    let navigate = useNavigate()

    const [
        resetPasswordPost, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useResetPasswordMutation()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        try {
            const E_MAIL_CF = data.get('email')?.toString() || ''
            const rest = await resetPasswordPost({
                E_MAIL_CF
            }).unwrap()
            navigate('/login', { state: E_MAIL_CF })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="username"
                        autoFocus
                    />
                    <Link onClick={() => { navigate("/login") }} variant="body2">
                        Ritorno al login
                    </Link>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Reset
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}
