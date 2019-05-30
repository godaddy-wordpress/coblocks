( function( $ ) {

	var coblocksRecaptcha = {

		init: function() {

			var recaptchaFields = $( '.g-recaptcha-token' );

			if ( ! recaptchaFields.length ) {

				return;

			}

			recaptchaFields.each( function() {

				var $recaptchaTokenField = $( this );

				grecaptcha.execute( coblocksFormBlockAtts.recaptchaSiteKey, { action: 'coblocks' } ).then( function( token ) {

					$recaptchaTokenField.val( token );

				} );

			} );

		},

	};

	grecaptcha.ready( coblocksRecaptcha.init );

} )( jQuery );
