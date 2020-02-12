/*global jQuery*/

let flickiyTimer;

( function( $ ) {
	$( '.wp-block-coblocks-accordion-item__content' ).each( function() {
		if (
			! $( this ).find( '.wp-block-coblocks-gallery-carousel' ).length ||
			$( this ).closest( 'details' ).attr( 'open' )
		) {
			return;
		}
		$( this ).prev().click( function( e ) {
			if ( $( e.target ).closest( 'details' ).attr( 'open' ) ) {
				return;
			}
			flickiyTimer = setInterval( reInitFlickityCarousel, 1, e.target );
		} );
	} );
} )( jQuery );

/**
 * Reinitialize the flickity carousel when it becomes visible.
 *
 * @param {Object} target e.target from the click handler.
 */
function reInitFlickityCarousel( target ) {
	const $targetCarousel = jQuery( target ).next().find( '.has-carousel' );
	if ( jQuery( target ).next().find( '.has-carousel' ).is( ':visible' ) && !$targetCarousel.attr( 'data-reinit' ) ) {
		$targetCarousel.attr( 'data-reinit', 1 ).flickity( 'destroy' ).flickity( JSON.parse( $targetCarousel.attr( 'data-flickity' ) ) ).flickity( 'resize' );
		clearInterval( flickiyTimer );
	}
}
