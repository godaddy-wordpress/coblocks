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

describe( 'coblocks/testimonial', () => {
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

	it( 'should render empty when Name is missing', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with content', () => {
		block.attributes.name = 'Some name';
		block.attributes.role = 'Some role';
		block.attributes.text = 'Some text';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toContain( 'Some role' );
		expect( serializedBlock ).toContain( 'Some text' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with the "conversation" style', () => {
		block.attributes.name = 'Some name';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with the "horizontal" style', () => {
		block.attributes.name = 'Some name';
		block.attributes.styleName = 'horizontal';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with image', () => {
		block.attributes.name = 'Some name';
		block.attributes.url = 'http://some.url/someimage.jpg';
		block.attributes.showImage = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'http://some.url/someimage.jpg' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with focal point on image', () => {
		block.attributes.name = 'Some name';
		block.attributes.url = 'http://some.url/someimage.jpg';
		block.attributes.focalPoint = { x: 0.5, y: 1 };
		block.attributes.showImage = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'background-position:50% 100%' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with background color', () => {
		block.attributes.name = 'Some name';
		block.attributes.backgroundColor = 'primary';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"backgroundColor":"primary"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with custom background color', () => {
		block.attributes.name = 'Some name';
		block.attributes.customBackgroundColor = '#745151';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customBackgroundColor":"#745151"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with text color', () => {
		block.attributes.name = 'Some name';
		block.attributes.textColor = 'background';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"textColor":"background"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with custom text color', () => {
		block.attributes.name = 'Some name';
		block.attributes.customTextColor = '#ffda7c';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customTextColor":"#ffda7c"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with bubble background color', () => {
		block.attributes.name = 'Some name';
		block.attributes.bubbleBackgroundColor = 'primary';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-primary-background-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with custom bubble background color', () => {
		block.attributes.name = 'Some name';
		block.attributes.customBubbleBackgroundColor = '#745151';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customBubbleBackgroundColor":"#745151"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with bubble text color', () => {
		block.attributes.name = 'Some name';
		block.attributes.bubbleTextColor = 'background';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"bubbleTextColor":"background"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with custom bubble text color', () => {
		block.attributes.name = 'Some name';
		block.attributes.customBubbleTextColor = '#ffda7c';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customBubbleTextColor":"#ffda7c"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
