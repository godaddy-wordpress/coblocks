/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import shareMetadata from '../../share/block.json';
import transforms from '../transforms';
import { name, settings } from '../index';
import { name as shareName, settings as shareSettings } from '../../share/';

describe( 'coblocks/shape-divider transforms', () => {
	// social-profiles attributes
	const socialAttributes = {
		facebook: 'facebook.com',
		twitter: 'twitter.com',
		pinterest: 'pinterest.com',
		linkedin: 'linkedin.com',
		instagram: 'instagram.com',
		houzz: 'houzz.com',
		yelp: 'yelp.com',
		youtube: 'youtube.com',
	};

	// share attributes
	const shareAttributes = {
		facebook: true,
		twitter: true,
		pinterest: true,
		linkedin: true,
		email: true,
		tumblr: true,
		google: true,
		reddit: true,
	};

	beforeAll( () => {
		// Register the block.
		settings.attributes = metadata.attributes;
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from coblocks/social (share) block', () => {
		shareSettings.attributes = shareMetadata.attributes;
		registerBlockType( shareName, { category: 'common', ...shareSettings } );

		const coblocksShare = createBlock( 'coblocks/social', shareAttributes );
		const transformed = switchToBlockType( coblocksShare, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform to coblocks/social (share) block', () => {
		const block = createBlock( name, socialAttributes );
		const transformed = switchToBlockType( block, 'coblocks/social' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'coblocks/social' );
		for ( const property in shareAttributes ) {
			expect( transformed[ 0 ].attributes[ property ] ).toBe( shareAttributes[ property ] );
		}
	} );

	it( 'should maintain attribute values in localStorage with transforms', () => {
		const block = createBlock( name, socialAttributes );
		const firstTransformed = switchToBlockType( block, 'coblocks/social' );
		expect( firstTransformed[ 0 ].isValid ).toBe( true );
		expect( firstTransformed[ 0 ].name ).toBe( 'coblocks/social' );
		for ( const property in shareAttributes ) {
			expect( firstTransformed[ 0 ].attributes[ property ] ).toBe( shareAttributes[ property ] );
		}

		const secondTransformed = switchToBlockType( firstTransformed, 'coblocks/social-profiles' );
		expect( secondTransformed[ 0 ].isValid ).toBe( true );
		expect( secondTransformed[ 0 ].name ).toBe( 'coblocks/social-profiles' );
		for ( const property in socialAttributes ) {
			expect( secondTransformed[ 0 ].attributes[ property ] ).toBe( socialAttributes[ property ] );
		}
	} );
} );
