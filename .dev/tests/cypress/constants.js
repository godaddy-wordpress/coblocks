var wpUsername;
var wpPassword;
var testURL;

try {
  var wpCreds = require( '../../../wp_creds.json' );
  wpUsername  = wpCreds.wpUsername;
  wpPassword  = wpCreds.wpPassword
  testURL     = wpCreds.testURL;
} catch ( ex ) {
  wpUsername = 'admin';
  wpPassword = 'password'
  testURL    = 'http://coblocks.test';
}

export { wpUsername, wpPassword, testURL };
