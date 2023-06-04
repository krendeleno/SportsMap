import { FacilityPhoto } from 'src/client/shared/types/facilities';
import { Carousel } from 'src/client/shared/components/Carousel';
import { ScalableImage } from 'src/client/shared/components/ScalableImage';
import { Button } from 'src/client/shared/components/Button';

import PrevPhoto from 'public/icons/prevPhoto.svg';
import NextPhoto from 'public/icons/nextPhoto.svg';

import './PhotoCarousel.css';

type PhotoCarouselProps = {
    photos: FacilityPhoto[];
    width: number;
    height: number;
    className?: string;
};

export const PhotoCarousel = ({ photos, width, height, className }: PhotoCarouselProps) => {
    return (
        <div className={className} style={{ width, height }}>
            <Carousel
                draggable
                arrows
                dots={false}
                nextArrow={<Button icon={<NextPhoto width={30} height={30} />} />}
                prevArrow={<Button icon={<PrevPhoto width={30} height={30} />} />}
            >
                {photos.map(({ id, url }) => (
                    <ScalableImage preview={{mask: <>Увеличить фото</>}} src={url} key={id} width={width} height={height} />
                ))}
            </Carousel>
        </div>
    );
};
