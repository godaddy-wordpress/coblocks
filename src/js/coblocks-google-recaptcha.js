/*global grecaptcha coblocksFormBlockAtts*/

( function( $ ) {
	const coblocksRecaptcha = {

		init: function() {
			const recaptchaFields = $( '.g-recaptcha-token' );

			if ( ! recaptchaFields.length ) {
				return;
			}

			recaptchaFields.each( function() {
				const $recaptchaTokenField = $( this );

				grecaptcha.execute( coblocksFormBlockAtts.recaptchaSiteKey, { action: 'coblocks' } ).then( function( token ) {
					$recaptchaTokenField.val( token );
				} );
			} );
		},

	};

	grecaptcha.ready( coblocksRecaptcha.init );
}( jQuery ) );
