import React from 'react';
import { Galleria } from 'primereact/galleria';

const DetailTop = () => {
    const images = [
        { itemImageSrc: '/header.png', thumbnailImageSrc: '/header.png', alt: 'Image 1' },
        { itemImageSrc: '/header.png', thumbnailImageSrc: '/header.png', alt: 'Image 2' },
        { itemImageSrc: '/header.png', thumbnailImageSrc: '/header.png', alt: 'Image 3' },
        // Add more images as needed
    ];

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ height: "10vh" }} />;
    }

    return (
        <div>
            <div className="card">
                <Galleria
                    value={images}
                    responsiveOptions={responsiveOptions}
                    numVisible={5}
                    circular
                    style={{ maxWidth: '100%' }}
                    showItemNavigators
                    showItemNavigatorsOnHover
                    item={itemTemplate}
                    thumbnail={thumbnailTemplate}
                />
            </div>
        </div>
    );
}

export default DetailTop;
