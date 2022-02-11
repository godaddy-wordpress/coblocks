/**
 * External dependencies
 */
import classnames from 'classnames';
import { v4 as generateUuid } from 'uuid';
import PropTypes from 'prop-types';
import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

/**
 * WordPress dependencies
 */
import { usePrevious } from '@wordpress/compose';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';

const SwiperWrapper = ( props ) => {
	const { list, freeScroll, slidesPerView, loop } = props;
	const swiperUuid = useMemo( () => generateUuid(), [ list.length, freeScroll, slidesPerView, loop ] );

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
		loop = true,
		onSwipe = null,
		Pagination = null,
		freeScroll = false,
		uuid = null,
		slidesPerView = 1,
		spaceBetween = 0,
		navigationClass = null,
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
				centeredSlides: false,
				freeMode: freeScroll,
				longSwipesRatio: 0.8,
				loop,
				navigation: {
					nextEl: swiperNextButton,
					prevEl: swiperBackButton,
				},
				passiveListeners: true,
				plugins: [
					TinySwiperPluginNavigation,
				],
				slidesPerView,
				spaceBetween,
				touchable: false,
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
			<div className={ `swiper-slide` } id={ index } key={ index }>
				{ children( {
					index,
					item,
				} ) }
			</div>
		) );
	}, [ isDraggable ] );

	const renderNavigation = useMemo( () => {
		const prevButtonClasses = classnames( {
			[ `${ navigationClass }__prev` ]: navigationClass,
			'nav-button__prev': ! navigationClass,
			'no-navigation': navigation === false,
		} );

		const nextButtonClasses = classnames( {
			[ `${ navigationClass }__next` ]: navigationClass,
			'nav-button__next': ! navigationClass,
			'no-navigation': navigation === false,
		} );

		return (
			<>
				<button className={ prevButtonClasses } id={ `${ uuid }-prev` }>
					<svg className="icon" style={ { transform: 'rotate(180deg)' } } />
				</button>
				<button className={ nextButtonClasses } id={ `${ uuid }-next` }>
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

Swiper.propTypes = {
	autoPlaySpeed: PropTypes.number.isRequired,
	children: PropTypes.node,
	freeScroll: PropTypes.bool.isRequired,
	isDraggable: PropTypes.bool.isRequired,
	list: PropTypes.array,
	loop: PropTypes.bool.isRequired,
	navigation: PropTypes.bool.isRequired,
	onSwipe: PropTypes.func,
	pauseHover: PropTypes.any,
	slidesPerView: PropTypes.number.isRequired,
	uuid: PropTypes.string,
};

Swiper.defaultProps = {
	autoPlaySpeed: null,
	freeScroll: false,
	isDraggable: true,
	loop: true,
	navigation: false,
	slidesPerView: 1,
};

export default SwiperWrapper;
