import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { v4 as generateUuid } from 'uuid';

import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

import './style.scss';

const SwiperWrapper = ( props ) => {
	const swiperUuid = useMemo( () => generateUuid(), [ props.list.length, props.freeScroll, props.slidesPerView ] );

	return (
		<span key={ swiperUuid }>
			<Swiper uuid={ swiperUuid } { ...props } />
		</span>
	);
};

const Swiper = ( props ) => {
	const {
		list,
		children,
		navigation = false,
		isDraggable = true,
		autoPlaySpeed = null,
		pauseHover = null,
		onSwipe = null,
		Pagination = null,
		freeScroll = false,
		uuid = null,
		slidesPerView = 1,
	} = props;

	const [ swiper, setSwiper ] = useState( null );
	const [ autoPlay, setAutoPlay ] = useState( null );
	const [ hovering, setHovering ] = useState( false );

	const prevHovering = usePrevious( hovering );
	const prevAutoPlaySpeed = usePrevious( autoPlaySpeed );

	const swiperWrapperRef = useRef( null );

	useEffect( () => {
		if ( ! isDraggable ) {
			swiperWrapperRef.current.addEventListener( ( 'mousedown' ), ( e ) => e.stopPropagation() );

			return () => {
				swiperWrapperRef.current.removeEventListener( ( 'mousedown' ), ( e ) => e.stopPropagation() );
			};
		}
	}, [ isDraggable ] );

	useEffect( () => {
		const swiperContainer = document.getElementById( uuid );

		if ( swiperContainer ) {
			const resizeObserver = new ResizeObserver( () => {
				swiper?.update();
			} );

			resizeObserver.observe( swiperContainer );
		}
	}, [ swiper ] );

	useEffect( () => {
		try {
			const swiperContainer = document.getElementById( uuid );

			const swiperBackButton = document.getElementById( `${ uuid }-prev` );
			const swiperNextButton = document.getElementById( `${ uuid }-next` );

			const newSwiper = new TinySwiper( swiperContainer, {
				navigation: {
					prevEl: swiperBackButton,
					nextEl: swiperNextButton,
				},
				plugins: [
					TinySwiperPluginNavigation,
				],
				loop: true,
				centeredSlides: true,
				passiveListeners: true,
				longSwipesRatio: 0.8,
				touchable: false,
				freeMode: freeScroll,
				slidesPerView,
			} );

			if ( onSwipe ) {
				newSwiper.on( 'after-slide', onSwipe );
			}

			setSwiper( newSwiper );
		} catch ( error ) {
			/* eslint-disable no-console */
			console.log( 'swiper init error', error );
			/* eslint-enable no-console */
		}
	}, [] );

	useEffect( () => {
		// pause autoplay during hover
		if ( hovering === true && pauseHover === true && autoPlaySpeed !== null ) {
			clearInterval( autoPlay );
		}

		// restart autoplay after no longer hovering
		if ( hovering === false && prevHovering === true && pauseHover === true ) {
			setAutoPlay( setInterval( startAutoplay, autoPlaySpeed ) );
		}

		// turn on autoplay
		if ( prevAutoPlaySpeed === null && autoPlaySpeed !== null ) {
			setAutoPlay( setInterval( startAutoplay, autoPlaySpeed ) );
		}

		// turn off auto play
		if ( prevAutoPlaySpeed !== null && autoPlaySpeed === null ) {
			clearInterval( autoPlay );
		}

		// change auto play speed
		if ( prevAutoPlaySpeed !== null && autoPlaySpeed !== null && autoPlaySpeed !== prevAutoPlaySpeed ) {
			clearInterval( autoPlay );
			setAutoPlay( setInterval( startAutoplay, autoPlaySpeed ) );
		}
	}, [
		swiper,
		autoPlaySpeed,
		prevAutoPlaySpeed,
		autoPlay,
		hovering,
		pauseHover,
	] );

	const startAutoplay = useCallback( () => {
		swiper?.slideTo( swiper.state.index + 1 );
	}, [ swiper, hovering ] );

	const handleMouseEnter = () => {
		if ( pauseHover === true && autoPlay !== null ) {
			setHovering( true );
		}
	};

	const handleMouseLeave = () => {
		if ( pauseHover === true && autoPlay !== null ) {
			setHovering( false );
		}
	};

	const renderList = useMemo( () => {
		return list.map( ( item, index ) => (
			<div key={ index } className={ `swiper-slide` }>
				{ children( {
					item,
					index,
				} ) }
			</div>
		) );
	}, [ isDraggable ] );

	const renderNavigation = useMemo( () => {
		return (
			<>
				<button id={ `${ uuid }-prev` } className={ `nav-button__prev ${ navigation === false && 'no-navigation' }` } >
					<svg className="icon" style={ { transform: 'rotate(180deg)' } } />
				</button>
				<button id={ `${ uuid }-next` } className={ `nav-button__next ${ navigation === false && 'no-navigation' }` } >
					<svg className="icon" />
				</button>
			</>
		);
	}, [ navigation ] );

	const changeStep = ( index ) => {
		swiper?.slideTo( index );
	};

	const renderPagination = useMemo( () => {
		if ( Pagination ) {
			return Pagination( { changeStep } );
		}
	}, [ Pagination, swiper ] );

	return (
		<div
			className={ `coblocks-swiper-container` }
			onMouseEnter={ handleMouseEnter }
			onMouseLeave={ handleMouseLeave }
		>
			<div
				className="swiper-container"
				id={ uuid }
			>
				<div className="swiper-wrapper" id="swiper-wrapper" ref={ swiperWrapperRef } >
					{ renderList }
				</div>
				{ renderNavigation }
			</div>
			{ renderPagination }
		</div>
	);
};

export default SwiperWrapper;
