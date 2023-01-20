import { test, expect } from '@playwright/test';

const blockName = 'coblocks/alert';

test.describe.parallel( 'Alert', () => {
	test.beforeEach( async ( { page, browserName }, info ) => {
		await page.goto( '/wp-admin/post-new.php?post_type=post' );

		await page.waitForFunction( () => window.wp.data !== undefined );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).editPost( { title: '${ browserName } - ${ blockName } - ${ info.title }' } )` );
		await page.evaluate( `wp.data.dispatch( 'core/block-editor' ).insertBlocks( wp.blocks.createBlock( '${ blockName }' ) )` );
		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
	} );

	test( 'saves with no title or text', async ( { page } ) => {
		await expect( page.locator( `[data-type="${ blockName }"]` ) ).toBeVisible();
		await page.reload();
		await expect( page.locator( `[data-type="${ blockName }"]` ) ).toBeVisible();
	} );

	test( 'saves with custom title and text', async ( { page } ) => {
		const alertTitle = 'GoDaddy';
		const alertText = 'Domain Names, Websites, Hosting & Online Marketing Tools';

		await page.type( '.wp-block-coblocks-alert__title', alertTitle );
		await page.type( '.wp-block-coblocks-alert__text', alertText );

		await expect( page.locator( `.wp-block-coblocks-alert__title` ) ).not.toBeEmpty();
		await expect( page.locator( `.wp-block-coblocks-alert__text` ) ).not.toBeEmpty();

		await expect( page.locator( `.wp-block-coblocks-alert__title` ) ).toContainText( alertTitle );
		await expect( page.locator( `.wp-block-coblocks-alert__text` ) ).toContainText( alertText );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
		await page.reload();

		await expect( page.locator( `.wp-block-coblocks-alert__title` ) ).toContainText( alertTitle );
		await expect( page.locator( `.wp-block-coblocks-alert__text` ) ).toContainText( alertText );
	} );

} );
