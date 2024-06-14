import { PhotoCamera } from '@mui/icons-material'
import { CardActions, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useGetListImagesQuery, useInsertImageMutation } from '../ricerca/ricercaAPI'
import { ArtAna, TIPO_IMAGE } from '../ricerca/ricercaSlice'
import { ImagesUnsplash } from '../uploadImagesUnsplash/ImagesUnsplash'
import ImageSlider from './ImageSlider'

interface ImageItemProps {
    artAna: ArtAna
}

export default function ImageItem({ artAna }: ImageItemProps) {
    const { data, isLoading } = useGetListImagesQuery({ id: artAna.COD_ART!!, TIPO: TIPO_IMAGE.ART_ANA })

    const [upload, { isLoading: isLoadingInsert, error }] = useInsertImageMutation()

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            //setImageUrl(reader.result)
            try {
                const resu = upload({
                    COD_ART: artAna.COD_ART,
                    ART_IMAGE: file,
                }).unwrap()
            } catch (error) {
                console.log(error)
            }
        }

        reader.readAsDataURL(file)
    }

    return (
        <Card sx={{ height: '100%' }}>
            {data?.dataImages !== null && <ImageSlider data={data.data} images={data?.dataImages} />}
            <CardContent>
                <ImagesUnsplash artAna={artAna} />
                <Typography gutterBottom variant="h5" component="div">
                    {artAna.DES_ART}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {artAna.DES_CAT} | {artAna.COD_ART}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
                    <PhotoCamera />
                </IconButton>
            </CardActions>
        </Card>
    )
}
