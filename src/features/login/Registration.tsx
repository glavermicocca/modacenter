import { DevTool } from '@hookform/devtools'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { snackActions } from '../../SnackbarUtilsConfigurator'
import { useRegistrationPostMutation } from '../ricerca/ricercaAPI'
import { REGISTRATION_TYPE, RegistrationRequest } from '../ricerca/ricercaSlice'

const Registration = () => {
    var defaultValues = {
        RAG_SOC_CF: '',
        INDI_CF: '',
        CAP_CF: '',
        COMUNE_CF: '',
        PROVINCIA_CF: '',
        STATO_CF: '',
        P_IVA_CF: '',
        COD_FISC_CF: '',
        E_MAIL_CF: '',
        //PASS_WEB: '',
    }

    if (process.env.NODE_ENV === 'development') {
        defaultValues = {
            ...defaultValues,
            RAG_SOC_CF: 'RAGIONE SOCIALE',
            INDI_CF: 'UN INDIRIZZO',
            CAP_CF: '33333',
            COMUNE_CF: 'Cervi',
            PROVINCIA_CF: 'UD',
            STATO_CF: 'IT',
            P_IVA_CF: '123456',
            COD_FISC_CF: '654321',
            E_MAIL_CF: 'giacomo.cervignano@gmail.com',
            //PASS_WEB: '12345678',
        }
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationRequest>({
        mode: 'onBlur',
        defaultValues: defaultValues,
    })

    const [
        registrationPost, // This is the mutation trigger
        { isLoading, error }, // This is the destructured mutation result
    ] = useRegistrationPostMutation()

    const [errore, setErrore] = useState<string | null>(null)

    const onSubmit: SubmitHandler<RegistrationRequest> = async (data) => {
        try {
            const response = await registrationPost({
                ...data,
            }).unwrap()

            switch (response.message) {
                case REGISTRATION_TYPE.STEP_ONE_FARE_LOGIN:
                    setErrore(
                        "Att.ne questa email è già associata ad un profilo - puoi provare ad usare i dati che conosci per fare il login oppure contatta l'amministrazione per risolvere"
                    )
                    break
                case REGISTRATION_TYPE.STEP_TWO_ALTRA_EMAIL_ASSOCIATA:
                    setErrore(
                        "Att.ne questa azienda è già configurata per lavorare con un altra email - contatta l'amministrazione per risolvere"
                    )
                    break
                case REGISTRATION_TYPE.STEP_TWO_NO_EMAIL:
                    setErrore(
                        'Ti abbiamo mandato un email per completare la registrazione - verifica che non sia finita nella posta indesiderata - a volte capita 🫣'
                    )
                    break
                case REGISTRATION_TYPE.STEP_TWO_NO_PASSWORD:
                    setErrore('Ti abbiamo mandato un email per completare la registrazione')
                    break
                case REGISTRATION_TYPE.STEP_TWO_TOO_MANY_EMAIL:
                    setErrore(
                        "Att.ne abbiamo rilavato che il tuo indirizzo compare in più aziende - contatta l'amministrazione per risolvere"
                    )
                    break
                case REGISTRATION_TYPE.STEP_THREE_CREAZIONE_CF:
                    setErrore(
                        'Ti abbiamo mandato un email per completare la registrazione - verifica che non sia finita nella posta indesiderata - a volte capita 🫣'
                    )
                    break
                default:
                    break
            }
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
                    Registra la tua attività
                </Typography>
                <Grid maxWidth={(theme) => theme.breakpoints.values.sm} container spacing={2} mt={1}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.COD_FISC_CF?.message}
                            error={!!errors.COD_FISC_CF}
                            type="text"
                            placeholder="Codice fiscale"
                            {...register('COD_FISC_CF', { maxLength: 80, required: 'Codice fiscale è obbligatorio' })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.P_IVA_CF?.message}
                            error={!!errors.P_IVA_CF}
                            type="text"
                            placeholder="P.IVA"
                            {...register('P_IVA_CF', { maxLength: 100, required: 'P.Iva è obbligatoria' })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.E_MAIL_CF?.message}
                            error={!!errors.E_MAIL_CF}
                            type="text"
                            placeholder="Email"
                            {...register('E_MAIL_CF', { required: 'Email è obbligatoria', pattern: /^\S+@\S+$/i })}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
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
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.RAG_SOC_CF?.message}
                            error={!!errors.RAG_SOC_CF}
                            type="text"
                            placeholder="Ragione sociale"
                            {...register('RAG_SOC_CF', { required: 'Ragione sociale è obbligatoria', maxLength: 255 })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.INDI_CF?.message}
                            error={!!errors.INDI_CF}
                            type="text"
                            placeholder="Indirizzo"
                            {...register('INDI_CF', { required: 'Indirizzo è obbligatorio', maxLength: 255 })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.CAP_CF?.message}
                            error={!!errors.CAP_CF}
                            type="text"
                            placeholder="Cap"
                            {...register('CAP_CF', { required: 'Il Cap è obbligatorio', maxLength: 255 })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.COMUNE_CF?.message}
                            error={!!errors.COMUNE_CF}
                            type="text"
                            placeholder="Comune"
                            {...register('COMUNE_CF', { required: 'Il Comune è obbligatorio', maxLength: 255 })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.PROVINCIA_CF?.message}
                            error={!!errors.PROVINCIA_CF}
                            type="text"
                            placeholder="Provincia"
                            {...register('PROVINCIA_CF', { required: 'La provincia è obbligatoria', maxLength: 255 })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            helperText={errors.STATO_CF?.message}
                            error={!!errors.STATO_CF}
                            type="text"
                            placeholder="Stato"
                            {...register('STATO_CF', { required: 'Lo stato è obbligatorio', maxLength: 255 })}
                        />
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography>{errore}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth size="large" variant="contained" type="submit">
                            Invia
                        </Button>
                    </Grid>
                </Grid>
                {process.env.NODE_ENV == 'development' && <DevTool control={control} />}
            </Box>
        </form>
    )
}

export default Registration
