/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/gist', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render with url attribute', () => {
		block.attributes.url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with meta attribute', () => {
		block.attributes.url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		block.attributes.meta = false;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' );
		expect( serializedBlock ).toContain( 'no-meta' );
		expect( serializedBlock ).toContain( '"meta":false' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with file attribute', () => {
		block.attributes.url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		block.attributes.file = 'file.js';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' );
		expect( serializedBlock ).toContain( 'file=file.js' );
		expect( serializedBlock ).toContain( '"file":"file.js"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with caption attribute', () => {
		block.attributes.url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		block.attributes.caption = 'caption';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' );
		expect( serializedBlock ).toContain( '<figcaption>caption</figcaption>' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with align attribute', () => {
		block.attributes.url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		block.attributes.align = 'wide';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' );
		expect( serializedBlock ).toContain( 'alignwide' );
		expect( serializedBlock ).toContain( '"align":"wide"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className attribute', () => {
		block.attributes.url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7' );
		expect( serializedBlock ).toContain( 'my-custom-class' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
