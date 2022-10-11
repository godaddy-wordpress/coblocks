import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

const loadEventCarousel = () => {
	const frontEndContainers = document.querySelectorAll( '.page .wp-block-coblocks-front-events-swiper-container' );

	// there may be multiple event blocks
	for ( let j = 0; j < frontEndContainers.length; j++ ) {
		const frontEndContainer = frontEndContainers[ j ];

		if ( ! frontEndContainer ) {
			return;
		}

		const swiperWrapper = frontEndContainer.querySelector( '.swiper-wrapper-loading' );

		const totalSlides = frontEndContainer.querySelectorAll( '.swiper-slide' );

		const swiperBackButton = frontEndContainer.parentNode.querySelector( `#wp-coblocks-event-swiper-prev` );
		const swiperNextButton = frontEndContainer.parentNode.querySelector( `#wp-coblocks-event-swiper-next` );

		swiperBackButton.setAttribute( 'aria-label', coblocksEvents.carouselPrevButtonAriaLabel );
		swiperNextButton.setAttribute( 'aria-label', coblocksEvents.carouselNextButtonAriaLabel );

		if ( totalSlides.length > 1 && swiperWrapper ) {
			swiperWrapper.classList.remove( 'swiper-wrapper-loading' );
			swiperWrapper.classList.add( 'swiper-wrapper' );

			swiperBackButton.style.visibility = 'visible';
			swiperNextButton.style.visibility = 'visible';

			new TinySwiper( frontEndContainer, {
				navigation: {
					nextEl: swiperNextButton,
					prevEl: swiperBackButton,
				},
				plugins: [
					TinySwiperPluginNavigation,
				],
				spaceBetween: 10,
				touchable: false,
			} );
		}
	}
};

const formatEventTimes = () => {
	const allEventItems = document.querySelectorAll( '.wp-block-coblocks-events__time-formatted' );
	for ( let x = 0; x < allEventItems.length; x++ ) {
		const eventItem = allEventItems[ x ];

		const startTime = eventItem.getAttribute( 'data-start-time' );
		const endTime = eventItem.getAttribute( 'data-end-time' );

		eventItem.innerHTML = ( `
			${ new Date( startTime ).toLocaleTimeString() }
			-
			${ new Date( endTime ).toLocaleTimeString() }
	` );
	}
};

( function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', function() {
		setTimeout( () => {
			loadEventCarousel();
			formatEventTimes();
		}, 500 );
	}, false );
}() );
