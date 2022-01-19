import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', () => {
		const eventsCarouselContainer = document.querySelector( '.wp-block-coblocks-front-events-swiper-container' );

		if ( eventsCarouselContainer ) {
			const swiperBackButton = document.getElementById( `wp-coblocks-event-swiper-prev` );
			const swiperNextButton = document.getElementById( `wp-coblocks-event-swiper-next` );

			new TinySwiper( eventsCarouselContainer, {
				navigation: {
					nextEl: swiperNextButton,
					prevEl: swiperBackButton,
				},
				plugins: [
					TinySwiperPluginNavigation,
				],
				touchable: false,
			} );
		}
	}, false );
}() );
