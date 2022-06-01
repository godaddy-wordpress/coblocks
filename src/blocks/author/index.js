/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		const parentBlock = wp.data.select( 'core/editor' ).getBlocksByClientId( props.clientId )[ 0 ];

		const authorName = props.attributes.name;
		const biography = props.attributes.biography;
		const buttonUrl = parentBlock.innerBlocks[ 0 ].attributes.url;
		const buttonText = parentBlock.innerBlocks[ 0 ].attributes.text;

		console.log( props );

		const authorNameBlock = createBlock( 'core/paragraph', { content: authorName } );
		const authorBioBlock = createBlock( 'core/paragraph', { content: biography } );
		const buttonBlock = createBlock( 'core/buttons', {}, [ createBlock( 'core/button', { text: buttonText, url: buttonUrl } ) ] );
		const imageBlock = createBlock( 'core/image', { className: 'is-style-rounded', id: props.attributes.imgId, url: props.attributes.imgUrl } );
		const columnsBlock = createBlock( 'core/columns', { style: { color: { background: '#F3F3F4' } } }, [ imageBlock, authorNameBlock, authorBioBlock, buttonBlock ] );

		// createBlock( 'core/columns', attributes, innerBlocks )
		// core/columns, core/image, core/paragraph, and core/buttons

		// author[ 0 ].innerBlocks = parentBlock.innerBlocks;

		replaceBlocks(
			[ props.clientId ],
			columnsBlock
		);

		return null;
	},
	parent: [],
	save: () => null,
	/* translators: block name */
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/author' ],
				transform: ( attributes ) => {
					return createBlock( 'core/author', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };
