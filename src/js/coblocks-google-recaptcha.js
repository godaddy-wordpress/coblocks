/*global grecaptcha coblocksFormBlockAtts*/

const initRecaptcha = () => {
	const recaptchaFields = Array.from( document.getElementsByClassName( 'g-recaptcha-token' ) );

	if ( ! recaptchaFields.length ) {
		return;
	}

	recaptchaFields.forEach( ( field ) => {
		grecaptcha.execute( coblocksFormBlockAtts.recaptchaSiteKey, { action: 'coblocks' } ).then( ( token ) => {
			field.value = token;
		} );
	} );
};

grecaptcha.ready( initRecaptcha );
