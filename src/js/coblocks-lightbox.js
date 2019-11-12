/* global: Image */
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

		const images = $( `.has-lightbox.lightbox-${ lightboxIndex } ul li figure img` );
		let index;

		modalHeading.append( counter, close );
		imageContainer.append( image );
		arrowLeftContainer.append( arrowLeft );
		arrowRightContainer.append( arrowRight );
		wrapper.append( wrapperBackground, modalHeading, imageContainer, arrowLeftContainer, arrowRightContainer );

		if ( images.length > 0 ) {
			$( 'body' ).append( wrapper );
		}

		const imagePreloader = {};

		images.each( function( index, img ) {
			imagePreloader[ `img-${ index }` ] = new window.Image();
			imagePreloader[ `img-${ index }` ].src = img.attributes.src.value;

			$( img ).click( function() {
				changeImage( index );
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
	}
}( jQuery ) );
