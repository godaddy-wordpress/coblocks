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

const DEFAULT_IMAGE_ATTRIBUTES = {
	backgroundImg: '150x150.png',
	mediaUrl: '150x150.png',
	mediaPosition: 'right',
	mediaType: 'image',
	backgroundOverlay: 50,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'contain',
	backgroundType: 'image',
	hasImgShadow: true,
	focalPoint: { x: 0.6352941176470588, y: 0.3729411405675552 },
}

describe( 'coblocks/media-card', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render', () => {
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with appropriate id class', () => {
		block.attributes.coblocks = { id: '1234' };
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'coblocks-media-card-1234' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with grid template column classes', () => {
		[ 'left', 'right' ].forEach( ( position ) => {
			block.attributes.mediaPosition = position;
			block.attributes.mediaWidth = '100';
			const serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( position === 'right' ? 'auto 100%' : '100% auto' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with align attribute', () => {
		const alignOptions = [ 'full', 'wide' ];
		alignOptions.forEach( ( alignOption ) => {
			block.attributes.align = alignOption;
			block.attributes.maxWidth = '100px';
			const serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `align${ alignOption }` );
			expect( serializedBlock ).toContain( 'max-width:100px' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with className attribute', () => {
		block.attributes.className = 'my-custom-class';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"className":"my-custom-class"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with background image attributes', () => {
		block.attributes = DEFAULT_IMAGE_ATTRIBUTES;
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'src="150x150.png"' );
		expect( serializedBlock ).toContain( 'background-image:url(150x150.png)' );
		expect( serializedBlock ).toContain( 'background-position:63.52941176470588% 37.29411405675552%' );
		expect( serializedBlock ).toContain( 'has-background-image' );
		expect( serializedBlock ).toContain( 'has-background-overlay' );
		expect( serializedBlock ).toContain( 'is-style-right' );
		expect( serializedBlock ).toContain( 'bg-no-repeat' );
		expect( serializedBlock ).toContain( 'has-shadow' );
		expect( serializedBlock ).toContain( 'bg-contain' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with background image attributes with media id', () => {
		block.attributes = DEFAULT_IMAGE_ATTRIBUTES;
		block.attributes.mediaId = '1234';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'wp-image-1234' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with background video attributes', () => {
		block.attributes.backgroundImg = '150x150.mp4';
		block.attributes.backgroundType = 'video';
		block.attributes.mediaUrl = '150x150.mp4';
		block.attributes.mediaType = 'video';
		block.attributes.mediaPosition = 'left';
		block.attributes.hasCardShadow = true;
		block.attributes.videoLoop = true;
		block.attributes.videoMuted = true;
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'src="150x150.mp4"' );
		expect( serializedBlock ).toContain( 'has-background-video' );
		expect( serializedBlock ).toContain( 'coblocks-video-bg' );
		expect( serializedBlock ).toContain( 'is-style-left' );
		expect( serializedBlock ).toContain( 'has-shadow' );
		expect( serializedBlock ).toContain( 'playsinline' );
		expect( serializedBlock ).toContain( 'autoplay' );
		expect( serializedBlock ).toContain( 'muted' );
		expect( serializedBlock ).toContain( 'loop' );
		expect( serializedBlock ).toContain( 'src="150x150.mp4"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render padding classes', () => {
		[ 'none', 'small', 'medium', 'large', 'huge' ].forEach( ( paddingSize ) => {
			block.attributes.paddingSize = paddingSize;
			const serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-' + paddingSize + '-padding' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );
