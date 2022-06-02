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

		const authorNameBlock = createBlock( 'core/paragraph', { content: props.attributes.name, fontSize: 'medium' } );
		const authorBioBlock = createBlock( 'core/paragraph', { content: props.attributes.biography } );
		const buttonBlock = createBlock( 'core/buttons', {}, [ createBlock( 'core/button', parentBlock.innerBlocks[ 0 ].attributes ) ] );
		const imageBlock = createBlock( 'core/image', { className: 'is-style-rounded', id: props.attributes.imgId, url: props.attributes.imgUrl } );

		const leftColumn = createBlock( 'core/column', { width: '25%' }, [ imageBlock ] );
		const rightColumn = createBlock( 'core/column', { width: '75%' }, [ authorNameBlock, authorBioBlock, buttonBlock ] );;

		const columnsBlock = createBlock( 'core/columns', { style: { color: { background: '#F3F3F4' } } }, [ leftColumn, rightColumn ] );

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
