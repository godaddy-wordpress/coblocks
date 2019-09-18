/* global: Image */
( function( $ ) {
	'use strict';

	const images = $( '.has-lightbox ul li figure img' );
	let index;

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

	modalHeading.append( counter, close );
	imageContainer.append( image );
	arrowLeftContainer.append( arrowLeft );
	arrowRightContainer.append( arrowRight );
	wrapper.append( wrapperBackground, modalHeading, imageContainer, arrowLeftContainer, arrowRightContainer );
	$( 'body' ).prepend( wrapper );

	const imagePreloader = {};

	$( '.has-lightbox ul li figure img' ).click( function( e ) {
		$.each( images, function( i, img ) {
			imagePreloader[ 'img-' + i ] = new window.Image();
			imagePreloader[ 'img-' + i ].src = img.attributes[ 4 ].value;
		} );

		index = Number( e.target.attributes[ 5 ].value );
		wrapper.css( 'display', 'flex' );
		wrapperBackground.css( 'background-image', 'url(' + imagePreloader[ 'img-' + index ].src + ')' );
		image.attr( 'src', imagePreloader[ 'img-' + index ].src );
		counter.html( ( Number( e.target.attributes[ 5 ].value ) + 1 ) + ' / ' + images.length );
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

	function changeImage( index ) {
		$.each( images, function( i, img ) {
			if ( parseInt( img.attributes[ 5 ].value ) === index ) {
				wrapperBackground.css( 'background-image', 'url(' + imagePreloader[ 'img-' + i ].src + ')' );
				image.attr( 'src', imagePreloader[ 'img-' + i ].src );
				counter.html( ( Number( img.attributes[ 5 ].value ) + 1 ) + ' / ' + images.length );
			}
		} );
	}
}( jQuery ) );
