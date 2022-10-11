import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', function() {
		setTimeout( () => {
			const postCarouselContainer = document.querySelectorAll( '.wp-block-coblocks-post-carousel' );

			for ( let j = 0; j < postCarouselContainer.length; j++ ) {
				const frontEndContainer = postCarouselContainer[ j ];

				if ( frontEndContainer ) {
					const swiperContainer = frontEndContainer.querySelector( '[data-swiper]' );
					const swiperData = JSON.parse( swiperContainer?.dataset?.swiper );

					const swiperBackButton = frontEndContainer.querySelector( `#wp-coblocks-post-carousel-swiper-prev` );
					const swiperNextButton = frontEndContainer.querySelector( `#wp-coblocks-post-carousel-swiper-next` );

					swiperBackButton.setAttribute( 'aria-label', coblocksPostCarousel.carouselPrevButtonAriaLabel );
					swiperNextButton.setAttribute( 'aria-label', coblocksPostCarousel.carouselNextButtonAriaLabel );

					const swiperSlies = frontEndContainer.querySelectorAll( '.swiper-slide' );

					if ( swiperSlies.length > 1 ) {
						swiperBackButton.style.visibility = 'visible';
						swiperNextButton.style.visibility = 'visible';

						new TinySwiper( swiperContainer, {
							centeredSlides: false,
							loop: true,
							navigation: {
								nextEl: swiperNextButton,
								prevEl: swiperBackButton,
							},
							plugins: [
								TinySwiperPluginNavigation,
							],
							slidesPerView: swiperData.slidesToShow,
							spaceBetween: 35,
							touchable: false,
						} );
					}
				}
			}
		}, 1500 );
	} );
}() );
