var wpUsername;
var wpPassword;
var testURL;

try {
  var wpCreds = require( '../../../wp_creds.json' );
  wpUsername  = wpCreds.wpUsername;
  wpPassword  = wpCreds.wpPassword
  testURL     = wpCreds.testURL;
} catch ( ex ) {
  wpUsername = 'username';
  wpPassword = 'password'
  testURL    = 'https://coblocks.test';
}

export { wpUsername, wpPassword, testURL };
