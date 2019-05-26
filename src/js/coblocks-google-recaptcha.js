var googleRecaptchaCallback = function() {
  grecaptcha.ready( function() {
    grecaptcha.execute( coblocksFormBlockAtts.recaptchaSiteKey, { action: 'contact' } ).then( function( token ) {
      document.getElementById( 'g-recaptcha-response' ).value = token;
    } );
  } );
};
