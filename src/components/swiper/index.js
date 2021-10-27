import { 
    useMemo, 
    useEffect, 
    useCallback, 
    useState,
} from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import ReactDOMServer from 'react-dom/server';
import { v4 as generateUuid } from 'uuid';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';
import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js';

import './style.scss';

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
    const [ swiper, setSwiper ] = useState( null );
    const [ autoPlay, setAutoPlay ] = useState( null );
    const [ hovering, setHovering ] = useState( false );

    const prevHovering = usePrevious( hovering );
    const prevAutoPlaySpeed = usePrevious( autoPlaySpeed );

    useEffect(() => {
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        if ( ! isDraggable ) {
            swiperWrapper.addEventListener('mousedown', stopDrag);

            return () => {
                swiperWrapper.removeEventListener('mousedown', stopDrag);
            }
        }
    }, [ isDraggable ]);

    const stopDrag = e => e.stopPropagation();

    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);

        const swiperBackButton = document.getElementById(`${uuid}-prev`);
        const swiperNextButton = document.getElementById(`${uuid}-next`);

        let swiperPlugins = [
            TinySwiperPluginNavigation,
            SwiperPluginPagination,
        ];

        const newSwiper = new TinySwiper(swiperContainer, {
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
            plugins: swiperPlugins,
            loop: true,
            centeredSlides: true,
            passiveListeners: true,
            longSwipesRatio: 0.8,
            touchable: false,
        });

        newSwiper.on('after-slide', onSwipe);

        setSwiper( newSwiper );
    }, []);

    useEffect(() => {
        // pause autoplay during hover
        if ( hovering === true && pauseHover === true && autoPlaySpeed !== null ) {
            clearInterval(autoPlay);
        }

        // restart autoplay after no longer hovering 
        if ( hovering === false && prevHovering === true && pauseHover === true ) {
            setAutoPlay(setInterval( startAutoplay, autoPlaySpeed ));
        }

        // turn on autoplay
        if ( prevAutoPlaySpeed === null && autoPlaySpeed !== null ) {
            setAutoPlay(setInterval( startAutoplay, autoPlaySpeed ));
        }

        // turn off auto play
        if ( prevAutoPlaySpeed !== null && autoPlaySpeed === null ) {
            clearInterval(autoPlay);
        }

        // change auto play speed
        if ( prevAutoPlaySpeed !== null && autoPlaySpeed !== null && autoPlaySpeed !== prevAutoPlaySpeed ) {
            clearInterval( autoPlay );
            setAutoPlay(setInterval( startAutoplay, autoPlaySpeed ));
        }
    }, [ swiper, autoPlaySpeed, prevAutoPlaySpeed, autoPlay, hovering, pauseHover ]);

    const startAutoplay = useCallback(() => {
        swiper.slideTo( swiper.state.index + 1 );
    }, [ swiper, hovering ]);

    const handleMouseEnter = () => {
        if ( pauseHover === true && autoPlay !== null ) {
            setHovering( true );
        }
    }

    const handleMouseLeave = () => {
        if ( pauseHover === true && autoPlay !== null ) {
            setHovering( false );
        }
    }    

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
        <div 
            className={`coblocks-swiper-container`} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="swiper-container" 
                id={uuid} 
            >
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