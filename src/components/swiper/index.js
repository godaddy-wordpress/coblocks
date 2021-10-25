import { useMemo, useEffect, useState, useRef } from '@wordpress/element';
import ReactDOMServer from 'react-dom/server';
import { v4 as uuid } from 'uuid';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';
import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js';
import SwiperPluginAutoPlay from 'tiny-swiper/lib/modules/autoPlay.min.js'

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
    paginationControl = null,
    isDraggable = true,
    freeScroll = false,
    autoPlaySpeed = null,
    pauseHover = null,
    onSwipe = null,
}) => {
    let swiper = useRef( null );

    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);

        const swiperBackButton = document.getElementById(`${uuid}-prev`);
        const swiperNextButton = document.getElementById(`${uuid}-next`);

        let swiperPlugins = [];

        if ( navigation === true ) {
            swiperPlugins = [ ...swiperPlugins, TinySwiperPluginNavigation ];
        }

        if ( paginationControl !== null ) {
            swiperPlugins = [ ...swiperPlugins, SwiperPluginPagination ];
        }

        if ( autoPlaySpeed ) {
            swiperPlugins = [ ...swiperPlugins, SwiperPluginAutoPlay ];
        }

        console.log('mount');

        swiper = new TinySwiper(swiperContainer, {
            ...(navigation === true ? ({
                navigation: {
                    prevEl: swiperBackButton,
                    nextEl: swiperNextButton
                  },
            } ) : {}),
            ...(paginationControl ? {
                pagination: {
                    el: `.${paginationControl?.class}`,
                    clickable: true,
                    bulletClass: "swiper-plugin-pagination__item",
                    bulletActiveClass: "is-active",
                    clickableClass: 'is-clickable',
                    // the tiny swiper package requires a string implementation of the pagination componennt
                    // renderBullet: (index, className) => PaginationControl.render({ index, className })
                    renderBullet: (index, className) => paginationControl?.render ? ReactDOMServer.renderToStaticMarkup( 
                        <div className={`is-clickable ${className}`}>
                            {paginationControl.render({ index, className })}
                        </div>
                    ) : null
                }
            } : {}),
            ...(autoPlaySpeed ? {
                autoplay: {
                    delay: autoPlaySpeed,
                    disableOnInteraction: true,
                },
            } : {}),
            plugins: swiperPlugins,
            loop: true,
            centeredSlides: true,
            touchStartForcePreventDefault: !isDraggable, 
            freeMode: freeScroll,
            longSwipesRatio: 0.8,
            touchStartPreventDefault: false,
            touchStartForcePreventDefault: true,
        });

        swiper.on('after-slide', onSwipe);
    }, [ pauseHover, autoPlaySpeed, freeScroll, isDraggable, navigation, paginationControl ]);

    const handleSwiperHover = () => {
        if ( autoPlaySpeed && pauseHover ) {
            console.log('pausing');
        }
        // if ( autoPlaySpeed && pauseHover && hovering === false ) {
        //     setHovering(true);
        // }
       
        // if ( autoPlaySpeed && pauseHover === true ) {

            
        //     // setHovering(true);

        //     const startingSlide = swiper.state.index;

        //     console.log('hover hover', startingSlide);

        //     swiper.destroy();

        //     const swiperContainer = document.getElementById(uuid);

        //     const swiperBackButton = document.getElementById(`${uuid}-prev`);
        //     const swiperNextButton = document.getElementById(`${uuid}-next`);

        //     let swiperPlugins = [];

        //     if ( navigation === true ) {
        //         swiperPlugins = [ ...swiperPlugins, TinySwiperPluginNavigation ];
        //     }

        //     if ( PaginationControl !== null ) {
        //         swiperPlugins = [ ...swiperPlugins, SwiperPluginPagination ];
        //     }

        //     if ( autoPlaySpeed ) {
        //         swiperPlugins = [ ...swiperPlugins, SwiperPluginAutoPlay ];
        //     }

        //     swiper = new TinySwiper(swiperContainer, {
        //         ...(navigation === true ? ({
        //             navigation: {
        //                 prevEl: swiperBackButton,
        //                 nextEl: swiperNextButton
        //             },
        //         } ) : {}),
        //         ...(PaginationControl ? {
        //             pagination: {
        //                 el: `.${PaginationControl?.class}`,
        //                 clickable: true,
        //                 bulletClass: "swiper-plugin-pagination__item",
        //                 bulletActiveClass: "is-active",
        //                 clickableClass: 'is-clickable',
        //                 // the tiny swiper package requires a string implementation of the pagination componennt
        //                 // renderBullet: (index, className) => PaginationControl.render({ index, className })
        //                 renderBullet: (index, className) => PaginationControl?.render ? ReactDOMServer.renderToStaticMarkup( 
        //                     <div className={`is-clickable ${className}`}>
        //                         {PaginationControl.render({ index, className })}
        //                     </div>
        //                 ) : null
        //             }
        //         } : {}),
        //         autoPlay: false,
        //         plugins: swiperPlugins,
        //         loop: true,
        //         centeredSlides: true,
        //         touchStartForcePreventDefault: !isDraggable, 
        //         freeScroll,
        //         longSwipesRatio: 0.8,
        //         // disableOnInteraction: !isDraggable || pauseHover
        //     });

        //     swiper.slideTo(startingSlide, 0);
        // }
    };

    const handleSwiperUnHover = () => {
        if ( autoPlaySpeed && pauseHover ) {
            console.log('un pause');
        }

        // if ( autoPlaySpeed && pauseHover === true ) {

        //     // setHovering(false);

        //     const startingSlide = swiper.state.index;

        //     console.log('startingSlide', startingSlide);

        //     swiper.destroy();

        //     const swiperContainer = document.getElementById(uuid);

        //     const swiperBackButton = document.getElementById(`${uuid}-prev`);
        //     const swiperNextButton = document.getElementById(`${uuid}-next`);

        //     let swiperPlugins = [];

        //     if ( navigation === true ) {
        //         swiperPlugins = [ ...swiperPlugins, TinySwiperPluginNavigation ];
        //     }

        //     if ( PaginationControl !== null ) {
        //         swiperPlugins = [ ...swiperPlugins, SwiperPluginPagination ];
        //     }

        //     if ( autoPlaySpeed ) {
        //         swiperPlugins = [ ...swiperPlugins, SwiperPluginAutoPlay ];
        //     }

        //     swiper = new TinySwiper(swiperContainer, {
        //         ...(navigation === true ? ({
        //             navigation: {
        //                 prevEl: swiperBackButton,
        //                 nextEl: swiperNextButton
        //             },
        //         } ) : {}),
        //         ...(PaginationControl ? {
        //             pagination: {
        //                 el: `.${PaginationControl?.class}`,
        //                 clickable: true,
        //                 bulletClass: "swiper-plugin-pagination__item",
        //                 bulletActiveClass: "is-active",
        //                 clickableClass: 'is-clickable',
        //                 // the tiny swiper package requires a string implementation of the pagination componennt
        //                 // renderBullet: (index, className) => PaginationControl.render({ index, className })
        //                 renderBullet: (index, className) => PaginationControl?.render ? ReactDOMServer.renderToStaticMarkup( 
        //                     <div className={`is-clickable ${className}`}>
        //                         {PaginationControl.render({ index, className })}
        //                     </div>
        //                 ) : null
        //             }
        //         } : {}),
        //         ...(autoPlaySpeed ? {
        //             autoplay: {
        //                 delay: autoPlaySpeed,
        //                 disableOnInteraction: true,
        //             },
        //         } : {}),
        //         plugins: swiperPlugins,
        //         loop: true,
        //         centeredSlides: true,
        //         touchStartForcePreventDefault: !isDraggable, 
        //         freeScroll,
        //         longSwipesRatio: 0.8,
        //         // disableOnInteraction: !isDraggable || pauseHover
        //     });

        //     // swiper.slideTo(startingSlide);
        // }
    };

    const renderList = useMemo(() => {
        return list.map((item, index) => (
            <div className="swiper-slide">
                {children({
                    item,
                    index,
                })}
            </div>
        ));
    }, []);
    
    return (
        <div className={`coblocks-swiper-container`} ref={swiper}>
            <div className="swiper-container" id={uuid} onMouseEnter={handleSwiperHover} onMouseLeave={handleSwiperUnHover} >
                <div className="swiper-wrapper" >
                    {renderList}
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
            {paginationControl && (
                <div className={paginationControl.class} />
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