import 'moment/locale/it'
import { useGetListImagesQuery } from '../ricerca/ricercaAPI'
import { TIPO_IMAGE } from '../ricerca/ricercaSlice'
import { ImageSlider } from './ImageSlider'

interface ArtAnaItemProps {
    _COD_ART?: string
    matchesVH: string
}

export function Images({ _COD_ART, matchesVH }: ArtAnaItemProps) {
    const { data } = useGetListImagesQuery({
        id: _COD_ART!!,
        TIPO: TIPO_IMAGE.ART_ANA,
    })

    return data !== null && data.dataImages !== null && <ImageSlider images={data.dataImages} matchesVH={matchesVH} />
}
