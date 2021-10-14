/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType, serialize, parse, rawHandler } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/gist transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform to embed block', () => {
		const url = 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c';

		const block = createBlock( name, { url } );
		const transformed = switchToBlockType( block, 'core/embed' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.url ).toBe( url );
	} );

	it( 'should transform to embed block with file', () => {
		const url = 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c';
		const file = '01.php';

		const block = createBlock( name, { url, file } );
		const transformed = switchToBlockType( block, 'core/embed' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.url ).toBe( url + '#file-01-php' );
	} );

	it( 'should transform to embed block with no-meta classname', () => {
		const url = 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c';

		const block = createBlock( name, { url, meta: false } );
		const transformed = switchToBlockType( block, 'core/embed' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.url ).toBe( url );
		expect( transformed[ 0 ].attributes.className ).toBe( 'no-meta' );
	} );

	it( 'should transform to embed block with deprecated wp-block-coblocks-gist--no-meta classname to no-meta classname', () => {
		const serializedBlock = "<!-- wp:coblocks\/gist {\"url\":\"https:\/\/gist.github.com\/jrtashjian\/98c1fcfd0e9f9ed59d710ccf7ef4291c\",\"meta\":false} -->\r\n<div class=\"wp-block-coblocks-gist--no-meta wp-block-coblocks-gist\"><script src=\"https:\/\/gist.github.com\/jrtashjian\/98c1fcfd0e9f9ed59d710ccf7ef4291c.js\"><\/script><noscript><a href=\"https:\/\/gist.github.com\/jrtashjian\/98c1fcfd0e9f9ed59d710ccf7ef4291c\">View this gist on GitHub<\/a><\/noscript><\/div>\r\n<!-- \/wp:coblocks\/gist -->";
		const url = 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c';

		const block = parse( serializedBlock );
		const transformed = switchToBlockType( block, 'core/embed' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.url ).toBe( url );
		expect( transformed[ 0 ].attributes.className ).toBe( 'no-meta' );
	} );

	it( 'should transform to embed block with caption', () => {
		const serializedBlock = "<!-- wp:coblocks\/gist {\"url\":\"https:\/\/gist.github.com\/jrtashjian\/98c1fcfd0e9f9ed59d710ccf7ef4291c\"} -->\r\n<div class=\"wp-block-coblocks-gist\"><script src=\"https:\/\/gist.github.com\/jrtashjian\/98c1fcfd0e9f9ed59d710ccf7ef4291c.js\"><\/script><noscript><a href=\"https:\/\/gist.github.com\/jrtashjian\/98c1fcfd0e9f9ed59d710ccf7ef4291c\">View this gist on GitHub<\/a><\/noscript><figcaption>This is a caption<\/figcaption><\/div>\r\n<!-- \/wp:coblocks\/gist -->";
		const url = 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c';

		const block = parse( serializedBlock );
		const transformed = switchToBlockType( block, 'core/embed' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.url ).toBe( url );
		expect( transformed[ 0 ].attributes.caption ).toBe( 'This is a caption' );
	} );
} );
