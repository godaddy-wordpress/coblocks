import { 
    useMemo, 
    useEffect, 
    useCallback, 
    useState,
} from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

import './style.scss';

const Swiper = ({ 
    list, 
    children, 
    navigation = false, 
    isDraggable = true,
    autoPlaySpeed = null,
    pauseHover = null,
    onSwipe = null,
    Pagination = null,
    uuid = null,
    type,
}) => {

    console.log('swiper props', {
        list,
        children,
        navigation,
        isDraggable,
        autoPlaySpeed,
        pauseHover,
        onSwipe,
        Pagination,
        type
    });


    const [ swiper, setSwiper ] = useState( null );
    const [ autoPlay, setAutoPlay ] = useState( null );
    const [ hovering, setHovering ] = useState( false );

    const prevHovering = usePrevious( hovering );
    const prevAutoPlaySpeed = usePrevious( autoPlaySpeed );

    useEffect(() => {
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        if ( ! isDraggable ) {
            swiperWrapper.addEventListener('mousedown', e => e.stopPropagation());

            return () => {
                swiperWrapper.removeEventListener('mousedown', e => e.stopPropagation());
            }
        }
    }, [ isDraggable ]);

    useEffect(() => {
        const swiperContainer = document.getElementById(uuid);

        const swiperBackButton = document.getElementById(`${uuid}-prev`);
        const swiperNextButton = document.getElementById(`${uuid}-next`);

        const newSwiper = new TinySwiper(swiperContainer, {
            navigation: {
                prevEl: swiperBackButton,
                nextEl: swiperNextButton
            },
            plugins: [
                TinySwiperPluginNavigation
            ],
            loop: true,
            centeredSlides: true,
            passiveListeners: true,
            longSwipesRatio: 0.8,
            touchable: false,
        });

        if ( onSwipe ) {
            newSwiper.on('after-slide', onSwipe);
        }

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
    }, [ 
        swiper, 
        autoPlaySpeed, 
        prevAutoPlaySpeed, 
        autoPlay, 
        hovering, 
        pauseHover 
    ]);

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
            <div key={uuid} className={`swiper-slide`}>
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

    const changeStep = ( index ) => {
        swiper.slideTo( index );
    };

    const renderPagination = useMemo(() => {
        if ( Pagination ) {
            return Pagination({ changeStep });
        }
    }, [ Pagination, swiper ]);
    
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
            {renderPagination}
         </div>       
    );
};

export default Swiper;