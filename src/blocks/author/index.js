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

		const authorNameBlock = createBlock( 'core/paragraph', { content: props.attributes.biography } );
		const authorBioBlock = createBlock( 'core/paragraph', { content: props.attributes.name, fontSize: 'medium' } );
		const buttonBlock = createBlock( 'core/buttons', {}, [ createBlock( 'core/button', parentBlock.innerBlocks[ 0 ].attributes ) ] );
		const imageBlock = createBlock( 'core/image', { className: 'is-style-rounded', id: props.attributes.imgId, url: props.attributes.imgUrl } );

		const leftColumn = createBlock( 'core/column', { width: '25%' }, [ imageBlock ] );
		const rightColumn = createBlock( 'core/column', { width: '75%' }, [ authorNameBlock, authorBioBlock, buttonBlock ] );

		const columnsStyleProps = {
			"style": {
				"spacing": {
					"padding": {
						"top": "2.5rem",
						"right": "2.5rem",
						"bottom": "2.5rem",
						"left": "2.5rem"
					}
				}
			},
			...(props.attributes.hasOwnProperty('style') && { style: props.attributes.style }),
		};

		const columnsBlockProps = {
			content: props.attributes.biography,
			...columnsStyleProps,
			...(props.attributes.hasOwnProperty('textColor') && { textColor: props.attributes.textColor }),
			...(props.attributes.hasOwnProperty('backgroundColor') && { backgroundColor: props.attributes.backgroundColor }),
		};

		const columnsBlock = createBlock( 'core/columns', columnsBlockProps, [ leftColumn, rightColumn ] );

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
