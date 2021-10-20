import React, { useEffect, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { usePrevious } from '@wordpress/compose';
import { v4 as uuid } from 'uuid';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';
import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js';

import './style.scss';

const SwiperHOC = (Component) => {
    return (props) => {
        const swiperUuid = uuid();

        return <Component key={swiperUuid} {...props} />;
    }
}

const Swiper = ({ 
    list, 
    uuid, 
    children, 
    navigation = false, 
    stepChangeCallback = null,
    PaginationControl = null,
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    let swiper = useRef( null );

    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);

        const swiperBackButton = document.getElementById(`${uuid}-prev`);
        const swiperNextButton = document.getElementById(`${uuid}-next`);

        let swiperPlugins = [];

        if ( navigation === true ) {
            swiperPlugins = [ ...swiperPlugins, TinySwiperPluginNavigation ];
        }

        if ( PaginationControl !== null ) {
            swiperPlugins = [ ...swiperPlugins, SwiperPluginPagination ];
        }

        swiper = new TinySwiper(swiperContainer, {
            ...(navigation === true ? ({
                navigation: {
                    prevEl: swiperBackButton,
                    nextEl: swiperNextButton
                  },
            } ) : {}),
            pagination: {
                el: `.${PaginationControl?.class}`,
                clickable: true,
                bulletClass: "swiper-plugin-pagination__item",
                bulletActiveClass: "is-active",
                clickableClass: 'is-clickable',
                // the tiny swiper package requires a string implementation of the pagination componennt
                // renderBullet: (index, className) => PaginationControl.render({ index, className })
                renderBullet: (index, className) => PaginationControl?.render ? ReactDOMServer.renderToStaticMarkup( 
                    <div className={`is-clickable ${className}`}>
                        {PaginationControl.render({ index, className })}
                    </div>
                ) : null
            },
            plugins: swiperPlugins,
            loop: true,
        });
    }, [ PaginationControl ]);

    useEffect(() => {
        if ( stepChangeCallback ) {
            stepChangeCallback( currentStep );
        }
    }, [currentStep]);

    const goBack = () => setCurrentStep(currentStep - 1);
    const goNext = () => setCurrentStep(currentStep + 1);
    
    return (
        <div className="coblocks-swiper-container" ref={swiper}>
            <div className="swiper-container" id={uuid}>
                <div className="swiper-wrapper">
                    {list.map((item, index) => (
                        <div className="swiper-slide">
                            {children({
                                item,
                                index,
                            })}
                        </div>
                    ))}
                </div>
                {navigation === true && (
                    <>
                        <button onClick={goBack} id={`${uuid}-prev`} className="nav-button__prev" >
                            <svg className="icon" style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button onClick={goNext} id={`${uuid}-next`} className="nav-button__next" >
                            <svg className="icon" />
                        </button>
                    </>
                )}
            </div>
            {PaginationControl && (
                <div className={PaginationControl.class} />
            )}  
        </div>               
    );

    // return (
    //     <>
    //     <div className="swiper-container" id={uuid}>
    //         <div className="swiper-wrapper">
    //             {list.map((item, index) => (
    //                 <div className="swiper-slide">
    //                     {children({
    //                         item,
    //                         index
    //                     })}
    //                 </div>
    //             ))}
    //         </div>
           
    //         {navigation === true && (
    //             <>
    //                 <button id={`${uuid}-prev`} className="nav-button__prev" >
    //                     <svg className="icon" style={{ transform: 'rotate(180deg)' }} />
    //                 </button>
    //                 <button id={`${uuid}-next`} className="nav-button__next" >
    //                     <svg className="icon" />
    //                 </button>
    //             </>
    //         )}
    //     </div>
    //      {thumbnails && (
    //         <div className="swiper-container-thumbnails" id={`${uuid}-thumbnails`}>
    //             <div className="swiper-wrapper swiper-wrapper-thumbnails">
    //                 {list.map((item, index) => (
    //                     <div className="swiper-slide-thumbnail">
    //                         {children({
    //                             item,
    //                             index
    //                         })}
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     )}
    //     </>
    // )
};

const SwiperMemo =  React.memo(Swiper, (prevProps, nextProps) => {
    console.log('memo comparison within swiper component', {
        prevProps,
        nextProps
    });
    return true;
});

export default SwiperHOC(SwiperMemo);