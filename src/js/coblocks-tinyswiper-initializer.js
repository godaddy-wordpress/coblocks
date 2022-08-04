import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	const eventsSwiperContainers = document.querySelectorAll( '.wp-block-coblocks-gallery-carousel' );

	for ( let j = 0; j < eventsSwiperContainers.length; j++ ) {
		let swiper = null;
		let activeIndex = 0;
		let isHovering = false;

		const currentEventsBlock = eventsSwiperContainers[ j ];

		const updateThumbnails = ( newIndex ) => {
			const currentActiveThumbnail = currentEventsBlock.querySelector( `.wp-block-coblocks-gallery-carousel-thumbnail-${ activeIndex }` );

			if ( currentActiveThumbnail ) {
				currentActiveThumbnail.classList.remove( 'is-active' );

				const nextActiveThumbnail = currentEventsBlock.querySelector( `.wp-block-coblocks-gallery-carousel-thumbnail-${ newIndex }` );

				if ( nextActiveThumbnail ) {
					nextActiveThumbnail.classList.add( 'is-active' );
				}
			}

			const currentActiveImage = currentEventsBlock.querySelector( `.swiper-slide[data-slider="${ activeIndex }"] .coblocks-gallery--item` );

			if ( currentActiveImage ) {
				currentActiveImage.classList.remove( 'is-selected' );

				const nextActiveImage = currentEventsBlock.querySelector( `.swiper-slide[data-slider="${ newIndex }"] .coblocks-gallery--item` );

				if ( nextActiveImage ) {
					nextActiveImage.classList.add( 'is-selected' );
				}
			}
		};

		const handleThumbnailClick = ( newIndex ) => {
			swiper?.slideTo( newIndex );
			updateThumbnails( newIndex );
			activeIndex = newIndex;
		};

		const handleSwipe = ( newIndex ) => {
			if ( newIndex !== activeIndex ) {
				updateThumbnails( newIndex );
				activeIndex = newIndex;
			}
		};

		const swiperContainer = currentEventsBlock.querySelector( '.swiper-container' );

		if ( swiperContainer ) {
			const swiperOptions = swiperContainer.getAttribute( 'data-swiper' );

			if ( swiperOptions ) {
				const parsedSwiperOptions = JSON.parse( swiperOptions );

				const swiperBackButton = currentEventsBlock.querySelector( `.nav-button__prev` );
				const swiperNextButton = currentEventsBlock.querySelector( `.nav-button__next` );

				const swiperConfig = {
					centeredSlides: false,
					freeMode: false, // Explicit false for UX concerns. This is by default false in tinyswiper.
					longSwipesRatio: 0.8,
					loop: false,
					passiveListeners: true,
					plugins: [],
					slidesPerView: 1,
				};

				if ( parsedSwiperOptions.loop === true ) {
					swiperConfig.loop = parsedSwiperOptions.loop;
				}

				if ( parsedSwiperOptions.slidesPerView ) {
					swiperConfig.slidesPerView = parsedSwiperOptions.slidesPerView;
				}

				// add button navigation
				if ( parsedSwiperOptions.navigation ) {
					swiperConfig.plugins = [ ...swiperConfig.plugins, TinySwiperPluginNavigation ];

					swiperConfig.navigation = {
						nextEl: swiperNextButton,
						prevEl: swiperBackButton,
					};
				}

				swiper = new TinySwiper( swiperContainer, swiperConfig );

				// register swiper resize observer
				const resizeObserver = new ResizeObserver( () => {
					swiper.update();
				} );

				resizeObserver.observe( swiperContainer );

				// add thumbnail pagination
				if ( parsedSwiperOptions.thumbnails ) {
					const paginationThumbnails = currentEventsBlock.querySelectorAll( '.wp-block-coblocks-gallery-carousel-thumbnail' );

					for ( const [ index, thumbnail ] of Object.entries( paginationThumbnails ) ) {
						thumbnail.addEventListener( ( 'click' ), () => handleThumbnailClick( index ) );
					}

					const firstThumbnailImage = currentEventsBlock.querySelector( `.wp-block-coblocks-gallery-carousel-thumbnail-${ 0 }` );

					if ( firstThumbnailImage ) {
						firstThumbnailImage.classList.add( 'is-active' );
					}
				}

				if ( ! parsedSwiperOptions.thumbnails && parsedSwiperOptions.pageDots ) {
					const paginationThumbnails = currentEventsBlock.querySelectorAll( '.wp-block-coblocks-gallery-carousel-page-dot-pagination' );

					for ( const [ index, thumbnail ] of Object.entries( paginationThumbnails ) ) {
						thumbnail.addEventListener( ( 'click' ), () => handleThumbnailClick( index ) );
					}

					const firstDot = currentEventsBlock.querySelector( `.wp-block-coblocks-gallery-carousel-page-dot--${ 0 }` );

					if ( firstDot ) {
						firstDot.classList.add( 'is-active' );
					}
				}

				// add draggable functionality
				if ( parsedSwiperOptions.draggable !== true ) {
					const swiperWrapper = currentEventsBlock.querySelector( '.swiper-wrapper' );

					swiperWrapper?.addEventListener( ( 'mousedown' ), ( e ) => {
						e.stopPropagation();
					} );
				}

				// add autoplay functionality
				if ( parsedSwiperOptions.autoPlay === true && parsedSwiperOptions.autoPlaySpeed ) {
					// add pause on hover functionality
					if ( parsedSwiperOptions.pauseHover === true ) {
						swiperContainer.addEventListener( 'mouseenter', () => {
							isHovering = true;
						} );

						swiperContainer.addEventListener( 'mouseleave', () => {
							isHovering = false;
						} );
					}

					setInterval( () => {
						if ( parsedSwiperOptions.pauseHover === true && isHovering === true ) {
							return;
						}

						swiper?.slideTo( swiper.state.index + 1 );
					}, parsedSwiperOptions.autoPlaySpeed );
				}

				let firstImage = currentEventsBlock.querySelector( `.swiper-slide[data-slider="0"] .coblocks-gallery--item` );

				if ( firstImage ) {
					firstImage.classList.add( 'is-selected' );
				}

				// register the swipe callback
				swiper.on( 'after-slide', handleSwipe );
			}
		}
	}
}() );
