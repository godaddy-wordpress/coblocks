import jQuery from 'jquery';

jQuery( function( $ ) {
	$( '.coblocks-form input.coblocks-field--date' ).datepicker( {
		beforeShow: function( input, inst ) {
			$('#ui-datepicker-div').addClass( 'coblocks' );
		}
	} );
} );
