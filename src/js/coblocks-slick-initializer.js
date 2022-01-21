import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

( function() {
	'use strict';

	let swiper = null;

	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	document.addEventListener( 'DOMContentLoaded', function() {
		console.log( 'dom loaded' );

		setTimeout( () => {
			const blockEditorContainer = document.querySelector( '.edit-post-visual-editor' );

			if ( blockEditorContainer ) {
				const postCarouselContainer = document.querySelector( '[data-type="coblocks/post-carousel"]' );

				if ( postCarouselContainer ) {
					if ( swiper === null ) {
						const postCarouselSwiperContainer = document.querySelector( '.coblocks-post-carousel-swiper-container' );
						const swiperBackButton = document.getElementById( `coblocks-post-carousel-swiper__prev` );
						const swiperNextButton = document.getElementById( `coblocks-post-carousel-swiper__next` );

						if ( postCarouselSwiperContainer && swiperBackButton && swiperNextButton ) {
							const swiperData = JSON.parse( postCarouselSwiperContainer?.dataset?.swiper );

							swiper = new TinySwiper( postCarouselSwiperContainer, {
								centeredSlides: false,
								navigation: {
									nextEl: swiperNextButton,
									prevEl: swiperBackButton,
								},
								plugins: [
									TinySwiperPluginNavigation,
								],
								slidesPerView: swiperData.slidesToShow,
								touchable: false,
							} );

							const observer = new MutationObserver( function( mutations ) {
								console.log( 'change???' );
							} );

							observer.observe( postCarouselContainer, {
								attributes: false,
								characterData: false,
								childList: true,
								subtree: true,
							} );
						}
					} else {
						console.log( 'change???' );
					}
				}
			}
		}, 1900 );

		const observer = new MutationObserver( function( mutations ) {

			// mutations.forEach( function( mutation ) {
			// 	for ( let i = 0; i < mutation.addedNodes.length; i++ ) {
			// 		if ( mutation.target.className === 'block-editor-block-list__block wp-block' ) {
			// 			console.log( 'swiper before the condish', swiper );
			// 			if ( swiper === null ) {
			// 				const postCarouselContainer = document.querySelector( '.coblocks-post-carousel-swiper-container > .swiper-container' );
			// 				const swiperNode = document.querySelector( '[data-swiper]' );

			// 				if ( swiperNode ) {
			// 					const swiperData = JSON.parse( swiperNode?.dataset?.swiper );

			// 					const swiperBackButton = document.getElementById( `coblocks-post-carousel-swiper__prev` );
			// 					const swiperNextButton = document.getElementById( `coblocks-post-carousel-swiper__next` );

			// 					swiper = new TinySwiper( postCarouselContainer, {
			// 						centeredSlides: false,
			// 						navigation: {
			// 							nextEl: swiperNextButton,
			// 							prevEl: swiperBackButton,
			// 						},
			// 						plugins: [
			// 							TinySwiperPluginNavigation,
			// 						],
			// 						slidesPerView: 3,
			// 						touchable: false,
			// 					} );
			// 				}
			// 			} else {
			// 				console.log( 'update swiper', swiper );
			// 				swiper.update();
			// 			}
			// 		}
			// 	}
			// } );
		} );

		observer.observe( document.body, {
			attributes: false,
			characterData: false,
			childList: true,
			subtree: true,
		} );
	} );

	// ----------------------------------------------------------

	// $( document ).ready( function() {
	// 	observer.observe( document.body, {
	// 		childList: true,
	// 		subtree: true,
	// 		attributes: false,
	// 		characterData: false,
	// 	} );
	// } );

	// const observer = new MutationObserver( function( mutations ) {
	// 	mutations.forEach( function( mutation ) {
	// 		if ( ! mutation.addedNodes ) {
	// 			return;
	// 		}

	// 		for ( let i = 0; i < mutation.addedNodes.length; i++ ) {
	// 			// do things to your newly added nodes here
	// 			const node = mutation.addedNodes[ i ];

	// 			if ( node.className === 'coblocks-slick' ) {
	// 				const carousel = $( '.coblocks-slick' );

	// 				if ( carousel ) {
	// 					carousel.slick();
	// 				}
	// 			}
	// 		}
	// 	} );
	// } );
}() );
