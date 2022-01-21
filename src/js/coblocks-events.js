import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	let swiper = null;

	const frontEndContainer = document.querySelector( '.wp-block-coblocks-events-front-container' );

	if ( frontEndContainer ) {
		const swiperBackButton = document.getElementById( `wp-coblocks-event-swiper-prev` );
		const swiperNextButton = document.getElementById( `wp-coblocks-event-swiper-next` );

		new TinySwiper( frontEndContainer, {
			navigation: {
				nextEl: swiperNextButton,
				prevEl: swiperBackButton,
			},
			plugins: [
				TinySwiperPluginNavigation,
			],
			touchable: false,
		} );
	} else {
		const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		const observer = new MutationObserver( function( mutations ) {
			mutations.forEach( function( mutation ) {
				for ( let i = 0; i < mutation.addedNodes.length; i++ ) {
					if ( mutation.target.className === 'coblocks-events-swiper-container-external-calendar' ) {
						if ( swiper === null ) {
							const eventsCarouselContainer = document.querySelector( '.wp-block-coblocks-front-events-swiper-container' );

							if ( eventsCarouselContainer ) {
								const swiperBackButton = document.getElementById( `wp-coblocks-event-swiper-prev` );
								const swiperNextButton = document.getElementById( `wp-coblocks-event-swiper-next` );

								swiper = new TinySwiper( eventsCarouselContainer, {
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
						} else {
							swiper.update();
						}
					}
				}
			} );
		} );

		observer.observe( document.body, {
			attributes: false,
			characterData: false,
			childList: true,
			subtree: true,
		} );
	}
}() );
