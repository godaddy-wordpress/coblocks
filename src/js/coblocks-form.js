( function( $ ) {

	var form = {

		submit: function() {

			var data = {
				'action': 'coblocks_form_submit'
			};

			// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
			jQuery.post( test.ajaxurl, data, function( response ) {
				alert( 'Got this from the server: ' + response.data );
			} );

		},

	};

	$( document ).ready( form.submit );

} )( jQuery );
