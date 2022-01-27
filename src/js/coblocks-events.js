import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', function() {
		setTimeout( () => {
			const frontEndContainers = document.querySelectorAll( '.wp-block-coblocks-front-events-swiper-container' );

			// there may be multiple event blocks
			for ( let j = 0; j < frontEndContainers.length; j++ ) {
				const frontEndContainer = frontEndContainers[ j ];

				if ( frontEndContainer ) {
					const totalSlides = frontEndContainer.querySelectorAll( '.swiper-slide' );

					const swiperBackButton = frontEndContainer.parentNode.querySelector( `#wp-coblocks-event-swiper-prev` );
					const swiperNextButton = frontEndContainer.parentNode.querySelector( `#wp-coblocks-event-swiper-next` );

					if ( totalSlides.length > 1 ) {
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
							touchable: false,
						} );
					}
				}
			}
		}, 500 );
	}, false );
}() );
