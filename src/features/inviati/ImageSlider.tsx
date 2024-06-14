import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { ImageObjSlicer } from '../ricerca/ricercaSlice'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export interface Props {
    images: Array<ImageObjSlicer> | []
    matchesVH: string
}

export function ImageSlider({ images, matchesVH }: Props) {
    let width = 90
    let height = 60

    if (matchesVH === 'none') {
        width = 80
        height = 50
    }

    let style = { width: width + 'px', height: height + 'px' }

    return images.length > 0 ? (
        <AutoPlaySwipeableViews style={style} slideStyle={{ overflow: 'hidden' }}>
            {images.map((step, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            ...style,
                            background: `url('${step.imgPath}&IMAGE_WIDTH=${width}&IMAGE_HEIGHT=${height}') no-repeat center center`,
                        }}
                    />
                )
            })}
        </AutoPlaySwipeableViews>
    ) : (
        <div style={style} />
    )
}
