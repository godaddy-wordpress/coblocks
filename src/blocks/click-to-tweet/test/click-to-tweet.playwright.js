import { test, expect } from '@playwright/test';

const blockName = 'coblocks/click-to-tweet';

test.describe.parallel( 'Click to Tweet', () => {
	test.beforeEach( async ( { page, browserName }, info ) => {
		await page.goto( '/wp-admin/post-new.php?post_type=post' );

		await page.waitForFunction( () => window.wp.data !== undefined );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).editPost( { title: '${ browserName } - ${ info.title }' } )` );
		await page.evaluate( `wp.data.dispatch( 'core/block-editor' ).insertBlock( wp.blocks.createBlock( '${ blockName }' ) )` );
		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
	} );

	test( 'saves with no content', async ( { page } ) => {
		await expect( page.locator( `[data-type="${ blockName }"]` ) ).toBeVisible();
		await page.reload();
		await expect( page.locator( `[data-type="${ blockName }"]` ) ).toBeVisible();
	} );

	test( 'saves with custom content', async ( { page } ) => {
		const text = 'GoDaddy - Domain Names, Websites, Hosting & Online Marketing Tools';
		const textLocator = '.wp-block-coblocks-click-to-tweet__text';

		await page.type( textLocator, text );

		await expect( page.locator( textLocator ) ).not.toBeEmpty();

		await expect( page.locator( textLocator ) ).toContainText( text );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
		await page.reload();

		await expect( page.locator( textLocator ) ).toContainText( text );
	} );

	test( 'can add tweet via', async ( { page } ) => {
		const via = 'godaddy';
		const viaLocator = '.wp-block-coblocks-click-to-tweet__via';

		await page.type( viaLocator, via );

		await expect( page.locator( viaLocator ) ).not.toBeEmpty();

		await expect( page.locator( viaLocator ) ).toHaveValue( via );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
		await page.reload();

		await page.locator( '.wp-block-coblocks-click-to-tweet__text' ).focus();
		await expect( page.locator( viaLocator ) ).toHaveValue( via );
	} );
} );

