import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MobileStepper from '@mui/material/MobileStepper'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { ImageObjSlicer } from '../ricerca/ricercaSlice'

import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone'
import { useRef } from 'react'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export interface Props {
    images: Array<ImageObjSlicer> | []
    setImage: (image: any) => void
}

function ImagesUnsplashSlider({ images, setImage }: Props) {
    const imgRef = useRef()
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0)
    const maxSteps = images?.length

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStepChange = (step: number) => {
        setActiveStep(step)
    }

    function handleUpload(): void {
        const img = document.createElement('img')
        img.crossOrigin = 'Anonymous'

        img.src = images[activeStep].imgPath

        let canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')

        img.onload = (obj: any) => {
            var width = img?.width
            var height = img?.height

            canvas.width = width
            canvas.height = height

            context?.drawImage(img, 0, 0)

            canvas.toBlob(async function (blob: any) {
                const buf = await blob.arrayBuffer()
                setImage(buf)
            }, 'image/jpg')
        }
    }

    return (
        images != null &&
        maxSteps != null &&
        maxSteps != 0 && (
            <Box>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents={true}
                >
                    {images?.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                        height: '400px',
                                        objectFit: 'cover',
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                />
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <IconButton aria-label="delete" size="large" onClick={() => handleUpload()}>
                    <FileUploadTwoToneIcon fontSize="inherit" />
                </IconButton>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        </Button>
                    }
                />
            </Box>
        )
    )
}

export default ImagesUnsplashSlider
