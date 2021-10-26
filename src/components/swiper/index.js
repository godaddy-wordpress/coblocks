import { useMemo, useEffect, useRef } from '@wordpress/element';
import ReactDOMServer from 'react-dom/server';
import { v4 as generateUuid } from 'uuid';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';
import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js';
import SwiperPluginAutoPlay from 'tiny-swiper/lib/modules/autoPlay.min.js'

import './style.scss';

const SwiperHOC = (Component) => {
    return (props) => {
        const swiperUuid = generateUuid();

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
    autoPlaySpeed = null,
    pauseHover = null,
    onSwipe = null,
}) => {
    let swiper = useRef( null );

    // useEffect(() => {
    //     const swiperContainer = document.getElementById(uuid);

    //     const swiperBackButton = document.getElementById(`${uuid}-prev`);
    //     const swiperNextButton = document.getElementById(`${uuid}-next`);

    //     let swiperPlugins = [];

    //     if ( navigation === true ) {
    //         swiperPlugins = [ ...swiperPlugins, TinySwiperPluginNavigation ];
    //     }

    //     if ( paginationControl !== null ) {
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
    //               },
    //         } ) : {}),
    //         ...(paginationControl ? {
    //             pagination: {
    //                 el: `.${paginationControl?.class}`,
    //                 clickable: true,
    //                 bulletClass: "swiper-plugin-pagination__item",
    //                 bulletActiveClass: "is-active",
    //                 clickableClass: 'is-clickable',
    //                 // the tiny swiper package requires a string implementation of the pagination componennt
    //                 // renderBullet: (index, className) => PaginationControl.render({ index, className })
    //                 renderBullet: (index, className) => paginationControl?.render ? ReactDOMServer.renderToStaticMarkup( 
    //                     <div className={`is-clickable ${className}`}>
    //                         {paginationControl.render({ index, className })}
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
    //         freeMode: freeScroll,
    //         longSwipesRatio: 0.8,
    //         touchStartPreventDefault: false,
    //         touchStartForcePreventDefault: true,
    //     });

    //     swiper.on('after-slide', onSwipe);
    // }, [ pauseHover, autoPlaySpeed, freeScroll, isDraggable, navigation, paginationControl ]);

    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);

        const swiperBackButton = document.getElementById(`${uuid}-prev`);
        const swiperNextButton = document.getElementById(`${uuid}-next`);

        let swiperPlugins = [
            TinySwiperPluginNavigation,
        ];

        // if ( navigation === true ) {
        //     swiperPlugins = [ ...swiperPlugins, TinySwiperPluginNavigation ];
        // }

        if ( paginationControl !== null ) {
            swiperPlugins = [ ...swiperPlugins, SwiperPluginPagination ];
        }

        if ( autoPlaySpeed ) {
            swiperPlugins = [ ...swiperPlugins, SwiperPluginAutoPlay ];
        }

        swiper = new TinySwiper(swiperContainer, {
            navigation: {
                prevEl: swiperBackButton,
                nextEl: swiperNextButton
            },
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
            longSwipesRatio: 0.8,
        });

        swiper.on('after-slide', onSwipe);
    }, []);

    useEffect(() => {
        if ( isDraggable === false ) {
            const swiperContainer = document.getElementById(uuid);

            swiperContainer.addEventListener('mousedown', (e) => {
                console.log('eeeeeeee mousedown', e);
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }, [ isDraggable ]);

    const handleSwiperHover = () => {
        if ( autoPlaySpeed && pauseHover ) {
            console.log('pausing');
        }
    };

    const handleSwiperUnHover = () => {
        if ( autoPlaySpeed && pauseHover ) {
            console.log('un pause');
        }
    };

    const renderList = useMemo(() => {
        return list.map((item, index) => (
            <div key={generateUuid()} className={`swiper-slide`}>
                {children({
                    item,
                    index,
                })}
            </div>
        ));
    }, [ isDraggable ]);

    const renderNavigation = useMemo(() => {
        return (
            <>
                <button id={`${uuid}-prev`} className={`nav-button__prev ${navigation === false && 'no-navigation'}`} >
                    <svg className="icon" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                <button id={`${uuid}-next`} className={`nav-button__next ${navigation === false && 'no-navigation'}`} >
                    <svg className="icon" />
                </button>
            </>
        )
    }, [ navigation ]);
    
    return (
        <div className={`coblocks-swiper-container`} ref={swiper}>
            <div className="swiper-container" id={uuid} onMouseEnter={handleSwiperHover} onMouseLeave={handleSwiperUnHover} >
                <div className="swiper-wrapper" >
                    {renderList}
                </div>
                {renderNavigation}
            </div>
            {paginationControl && (
                <div className={paginationControl.class} />
            )}               
        </div>               
    );
};

export default Swiper;