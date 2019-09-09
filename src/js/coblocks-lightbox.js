( function( $ ) {
	'use strict';

	var images = $( '.expandable-image ul li figure img' );
	var index;

	var wrapper = $( '<div/>', { class: 'masonry-modal-wrapper' } );
	var wrapperBackground = $( '<div/>', { class: 'masonry-modal-wrapper__background' } );
	var modalHeading = $('<div/>', { class: 'masonry-modal-wrapper__heading' });
	var close = $( '<div/>', { class: 'masonry-modal-wrapper--close' } );
	var counter = $( '<div/>', { class: 'masonry-modal-wrapper--counter' } );
	var imageContainer = $( '<div/>', { class: 'masonry-modal-wrapper__image-container' } );
	var image = $( '<img/>' );
	var arrowLeftContainer = $( '<div/>', { class: 'masonry-modal-wrapper--arrow-left-container' } );
	var arrowRightContainer = $( '<div/>', { class: 'masonry-modal-wrapper--arrow-right-container' } );
	var arrowRight = $( '<div/>', { class: 'arrow-right' } );
	var arrowLeft = $( '<div/>', { class: 'arrow-left' } );

	modalHeading.append( counter, close );
	imageContainer.append( image );
	arrowLeftContainer.append( arrowLeft );
	arrowRightContainer.append( arrowRight );
	wrapper.append( wrapperBackground, modalHeading, imageContainer, arrowLeftContainer, arrowRightContainer );
	$('body').prepend(wrapper);

	var imagePreloader = {};

	$( '.expandable-image ul li figure img' ).click( function( e ) {

		$.each(images, function( i, img ) {
			imagePreloader['img-' + i] = new Image();
			imagePreloader['img-' + i].src = img.attributes[ 4 ].value;
		});

		index = Number( e.target.attributes[ 5 ].value );
		wrapper.css( 'display', 'flex' );
		wrapperBackground.css( 'background', 'url(' + imagePreloader['img-' + index].src + ')' );
		image.attr( 'src', imagePreloader['img-' + index].src );
		counter.html( ( Number( e.target.attributes[ 5 ].value ) + 1 ) + ' / ' + images.length );
	} );

	arrowLeftContainer.click( function() {

		index === 0 ? index = 0 : index--;

		changeImage(index);
	});

	arrowRightContainer.click( function() {

		index === images.length ? index = images.length : index++;

		changeImage(index);
	});

	wrapperBackground.click( function() {
		wrapper.css( 'display', 'none' );
	});

	close.click( function() {
		wrapper.css( 'display', 'none' );
	});

	function changeImage(index) {
		$.each(images, function( i, img ) {
			if ( img.attributes[ 5 ].value == index ) {
				wrapperBackground.css( 'background', 'url(' + imagePreloader['img-' + i].src + ')' );
				image.attr( 'src', imagePreloader['img-' + i].src );
				counter.html( ( Number( img.attributes[ 5 ].value ) + 1 ) + ' / ' + images.length );
			}
		});
	}

}( jQuery ) );
