import { DevTool } from '@hookform/devtools'
import { LockOutlined } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { useLoginPostMutation } from '../ricerca/ricercaAPI'
import { CustomError, LoginRequest } from '../ricerca/ricercaSlice'
import { useState } from 'react'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://bassortofrutta.com/">
                BASSO ORTOFRUTTA
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default function LoginSide() {
    
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
            console.error(error)
        }
    }

    const [activeStep, setActiveStep] = useState(0)
    const handleStepChange = (step: number) => {
        setActiveStep(step)
    }

    const images = Array.from(Array(10).keys()).map((image) => `images/img_${image + 1}.jpg`)

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={false} sm={4} md={7}>
                <AutoPlaySwipeableViews
                    onChangeIndex={handleStepChange}
                    enableMouseEvents={true}
                    slideStyle={{ overflow: 'hidden' }}
                >
                    {images?.map((step, index) => {
                        return (
                            <Box
                                component="img"
                                key={index}
                                sx={{
                                    height: '100vh',
                                    width: '100%',
                                    backgroundImage: `url(${images[activeStep]})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        )
                    })}
                </AutoPlaySwipeableViews>
            </Grid>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                                {...register('E_MAIL_CF', {
                                    maxLength: 80,
                                    required: 'Email è obbligatorio',
                                    pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
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
                        <Grid item xs>
                            <Link
                                onClick={() => {
                                    navigate('/resetPassword')
                                }}
                                variant="body2"
                            >
                                Password dimenticata?
                            </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                    {process.env.NODE_ENV == 'development' && <DevTool control={control} />}
                </Box>
            </Grid>
        </Grid>
    )
}
