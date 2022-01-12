import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	const eventsCarouselContainer = document.querySelectorAll('.wp-block-coblocks-front-events-swiper-container')[0];

	if ( eventsCarouselContainer ) {
		console.log('eventsCarouselContainer', eventsCarouselContainer);

		const swiperBackButton = document.getElementById( `wp-coblocks-event-swiper-prev` );
		const swiperNextButton = document.getElementById( `wp-coblocks-event-swiper-next` );

		new TinySwiper( eventsCarouselContainer, {
			touchable: false,
			plugins: [
				TinySwiperPluginNavigation,
			],
			// slideClass: 'wp-block-coblocks-event-item',
			navigation: {
				prevEl: swiperBackButton,
				nextEl: swiperNextButton,
			},
		});
	}
	// $( document ).ready( function() {
	// 	const calendars = $( '.wp-block-coblocks-events[data-per-page]' );

	// 	console.log('we need this one i think...?');

	// 	if ( calendars ) {
	// 		calendars.each( function() {
	// 			$( this ).slick( {
	// 				infinite: false,
	// 				rows: this.dataset.perPage,
	// 				waitForAnimate: false,
	// 			} );
	// 		} );
	// 	}
	// } );

	
}() );
