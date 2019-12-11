/**
 * External dependencies
 */
import { registerBlockType, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

describe( 'coblocks/author transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform raw html to block', () => {
		const attrName = 'John Doe';
		const attrBio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
		const attrImgUrl = 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg';

		const HTML =
			`<div class="wp-block-coblocks-author">
				<figure class="wp-block-coblocks-author__avatar">
					<img class="wp-block-coblocks-author__avatar-img" src="${ attrImgUrl }" />
				</figure
				<div class="wp-block-coblocks-author__content">
					<span class="wp-block-coblocks-author__name">${ attrName }</span>
					<p class="wp-block-coblocks-author__biography">${ attrBio }</p>
				</div>
			</div>`;

		const block = rawHandler( { HTML } );

		expect( block[ 0 ].isValid ).toBe( true );
		expect( block[ 0 ].name ).toBe( name );
		expect( block[ 0 ].attributes.name ).toBe( attrName );
		expect( block[ 0 ].attributes.biography[ 0 ] ).toBe( attrBio );
		expect( block[ 0 ].attributes.imgUrl ).toBe( attrImgUrl );
	} );

	it( 'should transform when ":author" prefix is seen', () => {
		const prefix = ':author';
		const block = helpers.performPrefixTransformation( name, prefix, prefix );
		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );
