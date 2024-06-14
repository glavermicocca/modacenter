import { DevTool } from '@hookform/devtools'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
    RAG_SOC_CF: string
    INDI_CF: string
    CAP_CF: string
    COMUNE_CF: string
    PROVINCIA_CF: string
    STATO_CF: string
    P_IVA_CF: string
    COD_FISC_CF: string
    E_MAIL_CF: string
    PASS_WEB: string
}

const Register = () => {
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
        PASS_WEB: '',
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
            E_MAIL_CF: 'email@example.com',
            PASS_WEB: '12345678',
        }
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        mode: 'onBlur',
        defaultValues: defaultValues,
    })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {}

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

export default Register

// import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { FormInputText } from "./FormInputText";
// import { LockOutlined } from "@mui/icons-material";
// interface IFormInput {
//   RAG_SOC_CF: string
//   INDI_CF: string
//   CAP_CF: string
//   COMUNE_CF: string
//   PROVINCIA_CF: string
//   STATO_CF: string
//   P_IVA_CF: string
//   COD_FISC_CF: string
//   E_MAIL_CF: string
//   PASS_WEB: string
// }
// const defaultValues = {
//   RAG_SOC_CF: "",
//   INDI_CF: "",
//   CAP_CF: "",
//   COMUNE_CF: "",
//   PROVINCIA_CF: "",
//   STATO_CF: "",
//   P_IVA_CF: "",
//   COD_FISC_CF: "",
//   E_MAIL_CF: "",
//   PASS_WEB: "",
// };
// export const Register = () => {
//   const { handleSubmit, reset, control } = useForm<IFormInput>({
//     defaultValues: defaultValues,
//   });
//   const onSubmit = (data: IFormInput) => ;
//   return (
//     <Box
//         display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" minHeight="100vh"
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlined />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Paper
//       style={{
//         display: "grid",
//         gridRowGap: "20px",
//         padding: "20px",
//         margin: "10px 300px",
//       }}
//     >
//       <FormInputText name="RAG_SOC_CF" control={control} label="Ragione sociale" />
//       <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
//         Submit
//       </Button>
//       <Button onClick={() => reset()} variant={"outlined"}>
//         Reset
//       </Button>
//     </Paper>
//           </Box>

//   );
// };

// export default Register
