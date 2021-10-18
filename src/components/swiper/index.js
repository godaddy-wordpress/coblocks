import React, { useEffect } from 'react';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

import './style.scss';

const Swiper = ({ list, uuid, children, navigation = false, thumbnails = false }) => {
    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);

        const swiperBackButton = document.getElementById(`${uuid}-prev`);
        const swiperNextButton = document.getElementById(`${uuid}-next`);

        const swiper = new TinySwiper(swiperContainer, {
            ...(navigation === true ? ({
                navigation: {
                    prevEl: swiperBackButton,
                    nextEl: swiperNextButton
                  },
                plugins: [TinySwiperPluginNavigation]
            } ) : {}),
        });

        if ( thumbnails ) {
            const swiperThumbnailContainer = document.getElementById(`${uuid}-thumbnails`);

            const thumbnailsSwiper = new TinySwiper(swiperThumbnailContainer);
        }
    }, []);

    return (
        <>
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
           
            {navigation === true && (
                <>
                    <button id={`${uuid}-prev`} className="nav-button__prev" >
                        <svg className="icon" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button id={`${uuid}-next`} className="nav-button__next" >
                        <svg className="icon" />
                    </button>
                </>
            )}
        </div>
         {thumbnails && (
            <div className="swiper-container" id={`${uuid}-thumbnails`}>
                <div className="swiper-wrapper">
                    {list.map((item, index) => (
                        <div className="swiper-slide-thumbnail">
                            {children({
                                item,
                                index
                            })}
                        </div>
                    ))}
                </div>
            </div>
        )}
        </>
    )
}

export default Swiper;