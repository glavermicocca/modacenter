import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { IconButton, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MobileStepper from '@mui/material/MobileStepper'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { GenericDialog } from '../../components/GenericDialog'
import { useDeleteImageMutation } from '../ricerca/ricercaAPI'
import { ArtImageObj, ImageObjSlicer, TIPO_IMAGE } from '../ricerca/ricercaSlice'
import './swipe.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export interface Props {
    images: Array<ImageObjSlicer> | []
    data: Array<ArtImageObj> | []
    readonly?: boolean
}

function ImageSlider({ data, images, readonly }: Props) {
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

    const [deleteImage, { isLoading, error }] = useDeleteImageMutation()
    const [deleteArtImageObj, setDeleteArtImageObj] = useState<ArtImageObj | null>(null)
    function handleDelete(): void {
        setDeleteArtImageObj((prev) => data[activeStep])
    }

    return (
        maxSteps !== null &&
        maxSteps > 0 && (
            <>
                <GenericDialog
                    siTxt="si"
                    noTxt="chiudi"
                    isOpen={deleteArtImageObj !== null}
                    title="Cancella immagine"
                    content={
                        <Box
                            component="img"
                            sx={{
                                display: 'block',
                                overflow: 'hidden',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            src={images[activeStep]?.imgPath + '&IMAGE_WIDTH=400&IMAGE_HEIGHT=300'}
                            alt={images[activeStep]?.label}
                        />
                    }
                    onConfirm={async function () {
                        try {
                            const respo = await deleteImage({
                                id: deleteArtImageObj?.ART_IMAGE_ID!!,
                                TIPO: TIPO_IMAGE.ART_ANA,
                            }).unwrap()
                            setDeleteArtImageObj(null)
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                    onCancel={function (): void {
                        setDeleteArtImageObj(null)
                    }}
                />
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents={true}
                    style={{ height: 85, marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                    slideStyle={{ overflow: 'hidden' }}
                >
                    {images?.map((step, index) => {
                        return (
                            <img
                                key={step.imgPath}
                                //component="img"
                                style={{
                                    minWidth: 200,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: '0 auto',
                                }}
                                src={step.imgPath + '&IMAGE_WIDTH=300&IMAGE_HEIGHT=200'}
                                alt={step.label}
                            />
                        )
                    })}
                </AutoPlaySwipeableViews>
                {readonly == undefined && (
                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete()}>
                        <DeleteForeverTwoToneIcon fontSize="inherit" />
                    </IconButton>
                )}
                {readonly == undefined && maxSteps > 1 && (
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        sx={{ maxWidth: 10 }}
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
                )}
            </>
        )
    )
}

export default ImageSlider
