/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { create, toHTMLString } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				const textContent = create( { html: content } );
				// 280 character limit per tweet
				textContent.text = textContent.text.slice( 0, 280 );
				return [
					createBlock( metadata.name, {
						content: toHTMLString( { value: textContent } ),
					} ),
				];
			},

		},
		{
			type: 'block',
			blocks: [ 'core/pullquote' ],
			transform: ( { value, citation } ) => {
				const textContent = [ create( { html: value } ), create( { html: citation } ) ];
				// 280 character limit per tweet
				textContent[ 0 ].text = textContent[ 0 ].text.slice( 0, 280 - textContent[ 1 ].text.length );
				return [
					createBlock( metadata.name, {
						content: toHTMLString( { value: textContent[ 0 ] } ) + toHTMLString( { value: textContent[ 1 ] } ),
					} ),
				];
			},
		},
		{
			type: 'block',
			blocks: [ 'core/quote' ],
			transform: ( { value, citation } ) => {
				const textContent = [ create( { html: value } ), create( { html: citation } ) ];
				// 280 character limit per tweet
				textContent[ 0 ].text = textContent[ 0 ].text.slice( 0, 280 - textContent[ 1 ].text.length );
				return [
					createBlock( metadata.name, {
						content: toHTMLString( { value: textContent[ 0 ] } ) + toHTMLString( { value: textContent[ 1 ] } ),
					} ),
				];
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => createBlock( 'core/paragraph', {
				content,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/pullquote' ],
			transform: ( { content } ) => createBlock( 'core/pullquote', {
				value: `<p>${ content }</p>`,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/quote' ],
			transform: ( { content } ) => createBlock( 'core/quote', {
				value: `<p>${ content }</p>`,
			} ),
		},
	],
};

export default transforms;
