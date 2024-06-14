import { DevTool } from '@hookform/devtools'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import jwt from 'jwt-decode'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { snackActions } from '../../SnackbarUtilsConfigurator'
import { ReturnObj, UpdatePasswordRequest } from '../ricerca/ricercaSlice'
import { useUpdatePassworPostMutation } from '../ricerca/ricercaAPI'

const ChangePasswordToken = () => {
    const location = useLocation()

    const navigate = useNavigate()

    const token = location.search!!.replace('?token=', '')

    const user: ReturnObj = jwt(token) // decode your token here

    var defaultValues = {
        PASS_WEB: '',
    }

    if (process.env.NODE_ENV === 'development') {
        defaultValues = {
            ...defaultValues,
            PASS_WEB: '12345678',
        }
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePasswordRequest>({
        mode: 'onBlur',
        defaultValues: defaultValues,
    })

    const [
        updatePasswordPost, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useUpdatePassworPostMutation()

    const [errore, setErrore] = useState<string | null>(null)

    const onSubmit: SubmitHandler<UpdatePasswordRequest> = async (data) => {
        try {
            const response = await updatePasswordPost({
                ...data,
                TOKEN: token,
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
                <Grid maxWidth={(theme) => theme.breakpoints.values.sm} container spacing={2} mt={1}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Ben tornato {user.cf.RAG_SOC_CF}, adesso che siamo sicuri che sia veramente tu, registra la
                            tua nuova password qui
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.PASS_WEB?.message}
                            error={!!errors.PASS_WEB}
                            type="password"
                            placeholder="Password"
                            {...register('PASS_WEB', {
                                required: 'Password è obbligatoria',
                                minLength: 8,
                                maxLength: 255,
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography>{errore}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Conferma
                        </Button>
                    </Grid>
                </Grid>
                {process.env.NODE_ENV == 'development' && <DevTool control={control} />}
            </Box>
        </form>
    )
}

export default ChangePasswordToken
