/**
 * External dependencies
 */
import { registerBlockType, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../';

describe( 'coblocks/pricing-table-item transforms', () => {
	const attributes = {
		title: [ 'Plan 1', 'Plan 2', 'Plan 3', 'Plan 4' ],
		amount: [ '99', '66', '33', '00' ],
		features: [ 'Features 1', 'Features 2', 'Features 3', 'Features 4' ],
	};

	let HTML = '';

	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	attributes.title.forEach( ( item, index ) => {
		it( `should transform raw html to ${ index + 1 } item block(s)`, () => {
			HTML = HTML + `
			<div class="wp-block-coblocks-pricing-table-item">
				<span class="wp-block-coblocks-pricing-table-item__title">${ attributes.title[ index ] }</span>
				<div class="wp-block-coblocks-pricing-table-item__price-wrapper">
					<span class="wp-block-coblocks-pricing-table-item__currency">$</span>
					<span class="wp-block-coblocks-pricing-table-item__amount">${ attributes.amount[ index ] }</span>
				</div>
				<ul class="wp-block-coblocks-pricing-table-item__features">
					<li>${ attributes.features[ index ] }</li>
				</ul>
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Buy Now 1</a></div>
			</div>`;

			const block = rawHandler( { HTML } );

			expect( block[ index ].isValid ).toBe( true );
			expect( block[ index ].name ).toBe( name );

			expect( block ).toHaveLength( index + 1 );

			expect( block[ index ].attributes.title[ 0 ] ).toBe( attributes.title[ index ] );
			expect( block[ index ].attributes.amount[ 0 ] ).toBe( attributes.amount[ index ] );
		} );
	} );
} );

