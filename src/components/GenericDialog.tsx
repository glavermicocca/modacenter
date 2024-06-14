import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface Props {
    isOpen: boolean
    title: string
    content: React.ReactNode
    onConfirm: () => void
    onCancel: () => void
    siTxt?: string
    noTxt?: string
}

export const GenericDialog = ({ isOpen, title, content, onConfirm, onCancel, siTxt, noTxt }: Props) => {
    const theme = useTheme()

    const lessThanMid = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Dialog fullWidth fullScreen={lessThanMid} maxWidth="sm" open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                {noTxt && <Button onClick={onCancel}>{noTxt}</Button>}
                {siTxt && (
                    <Button
                        variant="contained"
                        onClick={(event) => {
                            event.preventDefault()
                            onConfirm()
                        }}
                    >
                        {siTxt}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}
