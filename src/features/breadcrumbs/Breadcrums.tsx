import { Breadcrumbs, Link } from '@mui/material'
import { styled } from '@mui/system'
import { useLocation, useNavigate } from 'react-router-dom'

export const Breadcrums = () => {

    return (
        <Breadcrumbs
            separator="."
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '1rem',
                justifyContent: 'center',
            }}
        ></Breadcrumbs>
    )
}
