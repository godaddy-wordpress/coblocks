/* global: Image */
import jQuery from 'jquery';

( function( $ ) {
	'use strict';

	const lightboxModals = $( '.has-lightbox' );

	$.each( lightboxModals, function( index, lightbox ) {
		lightbox.className += ' lightbox-' + index + ' ';
		renderLightboxModal( index );
	} );

	function renderLightboxModal( lightboxIndex ) {
		const wrapper = $( '<div/>', { class: 'coblocks-lightbox' } );
		const wrapperBackground = $( '<div/>', { class: 'coblocks-lightbox__background' } );
		const modalHeading = $( '<div/>', { class: 'coblocks-lightbox__heading' } );
		const close = $( '<button/>', { class: 'coblocks-lightbox__close' } );
		const counter = $( '<span/>', { class: 'coblocks-lightbox__count' } );
		const imageContainer = $( '<div/>', { class: 'coblocks-lightbox__image' } );
		const image = $( '<img/>' );
		const arrowLeftContainer = $( '<button/>', { class: 'coblocks-lightbox__arrow coblocks-lightbox__arrow--left' } );
		const arrowRightContainer = $( '<button/>', { class: 'coblocks-lightbox__arrow coblocks-lightbox__arrow--right' } );
		const arrowRight = $( '<div/>', { class: 'arrow-right' } );
		const arrowLeft = $( '<div/>', { class: 'arrow-left' } );

		const images = $( `.has-lightbox.lightbox-${ lightboxIndex } > :not(.carousel-nav) figure img` );
		const captions = $( `.has-lightbox.lightbox-${ lightboxIndex } > :not(.carousel-nav) figure figcaption` );
		let index;

		modalHeading.append( counter, close );
		imageContainer.append( image );
		arrowLeftContainer.append( arrowLeft );
		arrowRightContainer.append( arrowRight );
		wrapper.append( wrapperBackground, modalHeading, imageContainer, arrowLeftContainer, arrowRightContainer );

		if ( images.length > 0 ) {
			$( 'body' ).append( wrapper );
		}

		if ( captions.length > 0 ) {
			captions.each( function( captionIndex, caption ) {
				$( caption ).click( function() {
					changeImage( captionIndex );
				} );
			} );
		}

		const imagePreloader = {};

		images.each( function( imgIndex, img ) {
			imagePreloader[ `img-${ imgIndex }` ] = new window.Image();
			imagePreloader[ `img-${ imgIndex }` ].src = img.attributes.src.value;

			$( img ).click( function() {
				changeImage( imgIndex );
			} );
		} );

		arrowLeftContainer.click( function() {
			index = ( index === 0 ) ? ( images.length - 1 ) : ( index - 1 );
			changeImage( index );
		} );

		arrowRightContainer.click( function() {
			index = ( index === ( images.length - 1 ) ) ? 0 : ( index + 1 );
			changeImage( index );
		} );

		wrapperBackground.click( function() {
			wrapper.css( 'display', 'none' );
		} );

		close.click( function() {
			wrapper.css( 'display', 'none' );
		} );

		function changeImage( imageIndex ) {
			index = imageIndex;
			wrapper.css( 'display', 'flex' );
			wrapperBackground.css( 'background-image', 'url(' + imagePreloader[ `img-${ index }` ].src + ')' );
			image.attr( 'src', imagePreloader[ `img-${ index }` ].src );
			counter.html( ( index + 1 ) + ' / ' + images.length );
		}

		$( window ).keydown( function( event ) {
			const lightboxDisplayValue = wrapper.css( 'display' );
			const lightboxIsOpen = ( typeof lightboxDisplayValue !== typeof undefined && lightboxDisplayValue !== 'none' );
			if ( lightboxIsOpen ) {
				switch ( event.which ) {
					case 27 : // Esc key
						close.trigger( 'click' );
						break;
					case 37 : // Arrow left or 'A' key.
						arrowLeftContainer.trigger( 'click' );
						break;
					case 65 : // 'A' key.
						arrowLeftContainer.trigger( 'click' );
						break;
					case 39 : // Arrow right.
						arrowRightContainer.trigger( 'click' );
						break;
					case 68 : // 'D' key.
						arrowRightContainer.trigger( 'click' );
						break;
				}
			}
		} );
	}
}( jQuery ) );
