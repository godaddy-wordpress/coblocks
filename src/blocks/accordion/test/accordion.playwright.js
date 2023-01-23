import { test, expect } from '@playwright/test';

const blockName = 'coblocks/accordion';

test.describe.parallel( 'Accordion', () => {
	test.beforeEach( async ( { page, browserName }, info ) => {
		await page.goto( '/wp-admin/post-new.php?post_type=post' );

		await page.waitForFunction( () => window.wp.data !== undefined );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).editPost( { title: '${ browserName } - ${ info.title }' } )` );
		await page.evaluate( `wp.data.dispatch( 'core/block-editor' ).insertBlock( wp.blocks.createBlock( '${ blockName }' ) )` );
		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
	} );

	test( 'saves with no title or content', async ( { page } ) => {
		await expect( page.locator( `[data-type="${ blockName }"]` ) ).toBeVisible();
		await page.reload();
		await expect( page.locator( `[data-type="${ blockName }"]` ) ).toBeVisible();
	} );

	test( 'saves with custom title', async ( { page } ) => {
		const title = 'GoDaddy';
		const titleLocator = '.wp-block-coblocks-accordion-item__title';

		await page.type( titleLocator, title );

		await expect( page.locator( titleLocator ) ).not.toBeEmpty();

		await expect( page.locator( titleLocator ) ).toContainText( title );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
		await page.reload();

		await expect( page.locator( titleLocator ) ).toContainText( title );
	} );

	test( 'saves with custom content', async ( { page } ) => {
		const clientId = await page.evaluate( `wp.data.select( 'core/block-editor' ).getBlocks().shift().innerBlocks.shift().clientId` );
		const contentLocator = '.wp-block-coblocks-accordion-item__content .wp-block-paragraph:first-child';
		const contentText = 'Domain Names, Websites, Hosting & Online Marketing Tools';

		await page.type( '.wp-block-coblocks-accordion-item__title', 'GoDaddy' );
		await page.evaluate( `wp.data.dispatch( 'core/block-editor' ).insertBlocks( wp.blocks.createBlock( 'core/paragraph', { content: '${ contentText }' } ), 0, '${ clientId }' )` );

		await expect( page.locator( contentLocator ) ).toBeVisible();
		await expect( page.locator( contentLocator ) ).not.toBeEmpty();

		await expect( page.locator( contentLocator ) ).toContainText( contentText );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
		await page.reload();

		await page.locator( '.wp-block-coblocks-accordion-item__title' ).focus();
		await expect( page.locator( contentLocator ) ).toContainText( contentText );
	} );

	test( 'appends additional accordion item', async ( { page } ) => {
		const accordionItemsLocator = '.wp-block-coblocks-accordion [data-type="coblocks/accordion-item"]';
		await expect( page.locator( '.coblocks-block-appender' ) ).toBeVisible();

		await page.locator( '.coblocks-block-appender' ).click();

		let accordionItems = await page.locator( accordionItemsLocator );
		await expect( accordionItems ).toHaveCount( 2 );

		await page.evaluate( `wp.data.dispatch( 'core/editor' ).savePost()` );
		await page.reload();

		accordionItems = await page.locator( accordionItemsLocator );
		await expect( accordionItems ).toHaveCount( 2 );
	} );
} );

