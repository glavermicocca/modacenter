import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import { useLocation, useNavigate } from 'react-router-dom'
import { snackActions } from './SnackbarUtilsConfigurator'
import { useGetCfQuery } from './features/ricerca/ricercaAPI'
import { CfNewObj } from './features/ricerca/ricercaSlice'

export default function BreadCrumbsCliccable() {
    const { data: cfData } = useGetCfQuery()

    const cf: any | null = cfData != null ? cfData?.data.cf : null

    let steps = ['Iniziamo 🏁', 'Offerte 👀', 'Riepiloga 🤓', 'Luogo di consegna ⤴️', 'Fatta 🎉']

    const location = useLocation()

    const navigate = useNavigate()

    let defaultStep

    if (cf?.cfCliUser.FLAG_WEB_OFFERTE !== 1) {
        steps = ['Iniziamo 🏁', 'Riepiloga 🤓', 'Luogo di consegna ⤴️', 'Fatta 🎉']

        switch (location.pathname) {
            case '/':
                defaultStep = 0
                break
            case '/carrello':
                defaultStep = 1
                break
            case '/destinazione':
                defaultStep = 2
                break
            case '/fatta':
                defaultStep = 3
                break
        }
    } else {
        switch (location.pathname) {
            case '/':
                defaultStep = 0
                break
            case '/offerte':
                defaultStep = 1
                break
            case '/carrello':
                defaultStep = 2
                break
            case '/destinazione':
                defaultStep = 3
                break
            case '/fatta':
                defaultStep = 4
                break
        }
    }

    const handleStep = (step: number) => () => {
        if (cf?.cfCliUser.FLAG_WEB_OFFERTE !== 1) {
            switch (step) {
                case 0:
                    navigate('/')
                    break
                case 1:
                    navigate('/carrello')
                    break
                case 2:
                    navigate('/destinazione')
                    break
                case 3:
                    snackActions.warning(
                        "Non dire 😼 se non ce l'hai nel sacco. Verifica di aver aggiunto qualcosa nel carrenno e indica l'ora e il luogo di consegna!!!"
                    )
                    // non è a caso vuoto... serve evitare il click - vi vado dalla response dell'ordine
                    break
                default:
                    navigate('/')
            }
        } else {
            switch (step) {
                case 0:
                    navigate('/')
                    break
                case 1:
                    navigate('/offerte')
                    break
                case 2:
                    navigate('/carrello')
                    break
                case 3:
                    navigate('/destinazione')
                    break
                case 4:
                    snackActions.warning(
                        "Non dire 😼 se non ce l'hai nel sacco. Verifica di aver aggiunto qualcosa nel carrenno e indica l'ora e il luogo di consegna!!!"
                    )
                    // non è a caso vuoto... serve evitare il click - vi vado dalla response dell'ordine
                    break
                default:
                    navigate('/')
            }
        }
    }

    const isXs = useMediaQuery((theme: any) => theme.breakpoints.only('xs'))

    return defaultStep != null ? (
        <Box sx={{ width: '100%' }} mb={2}>
            <Stepper nonLinear activeStep={defaultStep} alternativeLabel={isXs}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </Box>
    ) : (
        <></>
    )
}
