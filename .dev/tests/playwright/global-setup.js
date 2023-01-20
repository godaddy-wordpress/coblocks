/**
 * Global setup file for Playwright tests, and is executed once before all tests
 * are run.
 */
const { chromium, expect } = require( '@playwright/test' );

module.exports = async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage( {
		baseURL: 'http://localhost:8889',
	} );

	// Log in to WordPress.
	await page.goto( '/wp-login.php' );
	await page.fill( '#user_login', 'admin' );
	await page.fill( '#user_pass', 'password' );
	await page.click( '#wp-submit' );
	await page.goto( '/wp-admin/post-new.php?post_type=post' );

	// Wait for wp.data to be available.
	await page.waitForFunction( () => window.wp.data !== undefined );

	// Ensure the Welcome Guide is disabled.
	if ( await page.evaluate( "wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' )" ) ) {
		await page.evaluate( "wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' )" );
	}

	await page.goto( '/wp-admin' );
	await page.goto( '/wp-admin/post-new.php?post_type=post' );

	// Expect the Welcome Guide to be hidden.
	await expect( page.locator( '.edit-post-welcome-guide' ) ).toBeHidden();

	// Save signed-in state to 'storageState.json'.
	await page.context().storageState( { path: '.dev/tests/playwright/storage-state.json' } );
	await browser.close();
};
