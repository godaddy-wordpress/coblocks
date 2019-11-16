var wpUsername;
var wpPassword;
var testURL;

try {
  var wpCreds = require( '../../../wp_creds.json' );
  wpUsername  = wpCreds.wpUsername;
  wpPassword  = wpCreds.wpPassword
  testURL     = wpCreds.testURL;
} catch ( error ) {
  if ( 'MODULE_NOT_FOUND' !== error.code ) {
    throw error;
  }
  wpUsername = 'admin';
  wpPassword = 'password'
  testURL    = 'http://coblocks.test';
}

export { wpUsername, wpPassword, testURL };
