import { DevTool } from '@hookform/devtools'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { snackActions } from '../../SnackbarUtilsConfigurator'
import { CustomError, LoginRequest } from '../ricerca/ricercaSlice'
import { useLoginPostMutation } from '../ricerca/ricercaAPI'

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

export function Login() {
    var defaultValues = {
        E_MAIL_CF: '',
    }

    let navigate = useNavigate()

    const [
        loginPost, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useLoginPostMutation()

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        mode: 'onBlur',
        defaultValues: defaultValues,
    })

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        try {
            const response = await loginPost({
                ...data,
            }).unwrap()

            navigate('/')
        } catch (error: any) {
            snackActions.error(error?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection={'column'} justifyContent="center" alignItems="center" minHeight="100vh">
                <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Grid maxWidth={(theme) => theme.breakpoints.values.sm} container spacing={2} mt={1}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.E_MAIL_CF?.message}
                            error={!!errors.E_MAIL_CF}
                            type="text"
                            placeholder="Email"
                            {...register('E_MAIL_CF', { maxLength: 80, required: 'Email è obbligatorio' })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.PASS_WEB?.message}
                            error={!!errors.PASS_WEB}
                            type="password"
                            placeholder="Password"
                            {...register('PASS_WEB', {
                                required: 'Lo password è obbligatorio',
                                minLength: 8,
                                maxLength: 255,
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography>{(error as CustomError)?.data?.message}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth size="large" variant="contained" type="submit">
                            Entra
                        </Button>
                    </Grid>
                </Grid>
                {process.env.NODE_ENV == 'development' && <DevTool control={control} />}
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </form>
    )
}
