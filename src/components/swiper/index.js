import React, { useEffect } from 'react';

import TinySwiper from 'tiny-swiper';

import './style.scss';

const Swiper = ({ list, uuid, children, slidesPerView = 1 }) => {

    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);
        const swiper = new TinySwiper(swiperContainer);
    }, []);

    return (
        <div className="swiper-container" id={uuid}>
            <div className="swiper-wrapper">
                {list.map((item, index) => (
                    <div className="swiper-slide">
                        {children({
                            item,
                            index
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Swiper;