import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', function() {
		console.log( 'loaded new new code' );

		const swiperContainer = document.querySelector( '.wp-block-coblocks-post-carousel' );

		if ( swiperContainer ) {
			console.log( 'swiperContainer', swiperContainer );
		}
	} );
}() );
