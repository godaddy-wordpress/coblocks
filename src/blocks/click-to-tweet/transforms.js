/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;
const { split, create, toHTMLString } = wp.richText;

/**
 * Internal dependencies
 */
import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => createBlock( metadata.name, {
				content: content,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/pullquote' ],
			transform: ( { value } ) => {
				const pieces = split( create( { html: value, multilineTag: 'p' } ), '\u2028' );

				return [
					createBlock( metadata.name, {
						content: toHTMLString( { value: pieces[ 0 ] } ),
					} ),
				];
			},
		},
		{
			type: 'block',
			blocks: [ 'core/quote' ],
			transform: ( { value } ) => {
				const pieces = split( create( { html: value, multilineTag: 'p' } ), '\u2028' );

				return [
					createBlock( metadata.name, {
						content: toHTMLString( { value: pieces[ 0 ] } ),
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
				content: content,
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
